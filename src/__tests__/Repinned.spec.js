import React from 'react'
import PropTypes from 'prop-types'
import { cleanup, render } from 'react-testing-library'
import 'jest-dom/extend-expect'

import Repinned from '../Repinned'

beforeEach(() => {
  jest
    .spyOn(global.window, 'requestAnimationFrame')
    .mockImplementation(cb => cb())
})

afterEach(() => {
  cleanup()
  global.window.requestAnimationFrame.mockRestore()
})

const getParent = () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  pageYOffset: 0,
  scrollHeight: 1200,
  offsetHeight: 50,
})

const RepinnedExample = ({ repinnedRef, ...props }) => (
  <div style={{ minHeight: '100vh' }}>
    <Repinned {...props} ref={repinnedRef}>
      {({ setRef, height, state }) => (
        <div
          data-testid="repinnedWrapper"
          style={{
            height,
          }}
        >
          <header ref={setRef} data-testid="headerContainer">
            <h1>This is header</h1>
            <div data-testid="RepinnedState">{state}</div>
          </header>
        </div>
      )}
    </Repinned>
    <div>This is some content</div>
  </div>
)

RepinnedExample.propTypes = {
  repinnedRef: PropTypes.func,
}

test('Repinned component renders properly', () => {
  const { getByTestId, container } = render(<RepinnedExample />)
  expect(getByTestId('RepinnedState')).toHaveTextContent('unfixed')
  expect(container.firstChild).toMatchSnapshot()
})

test('Repinned does not register on resize event listener if calcHeightOnResize is false', () => {
  const parent = getParent()
  render(<RepinnedExample parent={() => parent} calcHeightOnResize={false} />)

  expect(parent.addEventListener.mock.calls[0][0]).toBe('scroll')
  expect(parent.addEventListener.mock.calls.length).toBe(1)
})

test('Repinned didMount registers scroll event listener', () => {
  const parent = getParent()
  const { unmount } = render(<RepinnedExample parent={() => parent} />)

  expect(parent.addEventListener.mock.calls[0][0]).toBe('scroll')
  expect(parent.addEventListener.mock.calls[1][0]).toBe('resize')

  unmount()
  expect(parent.removeEventListener.mock.calls[0][0]).toBe('scroll')
  expect(parent.removeEventListener.mock.calls[1][0]).toBe('resize')
})

test('Repinned toggling forcePin on should remove event listeners', () => {
  const parent = getParent()
  const parentFn = () => parent

  const { rerender } = render(<RepinnedExample parent={parentFn} />)

  expect(parent.addEventListener.mock.calls[0][0]).toBe('scroll')

  rerender(<RepinnedExample parent={parentFn} forcePin />)

  expect(parent.removeEventListener.mock.calls[0][0]).toBe('scroll')
})

test('Repinned toggling forcePin off should add event listeners', () => {
  const parent = getParent()
  const parentFn = () => parent

  const { rerender } = render(<RepinnedExample parent={parentFn} forcePin />)

  expect(parent.addEventListener).toHaveBeenCalledTimes(1)

  parent.addEventListener.mockClear()

  rerender(<RepinnedExample parent={parentFn} />)

  expect(parent.addEventListener).toHaveBeenCalledTimes(1)
  expect(parent.addEventListener.mock.calls[0][0]).toBe('scroll')
})

test('Repinned toggling disabled on should remove event listeners', () => {
  const parent = getParent()
  const parentFn = () => parent

  const { rerender } = render(<RepinnedExample parent={parentFn} />)

  expect(parent.addEventListener.mock.calls[0][0]).toBe('scroll')
  expect(parent.addEventListener.mock.calls[1][0]).toBe('resize')

  rerender(<RepinnedExample parent={parentFn} disabled />)

  expect(parent.removeEventListener.mock.calls[0][0]).toBe('scroll')
  expect(parent.removeEventListener.mock.calls[1][0]).toBe('resize')
})

test('Repinned toggling disabled off should add event listeners', () => {
  const parent = getParent()
  const parentFn = () => parent

  const { rerender } = render(<RepinnedExample parent={parentFn} disabled />)

  expect(parent.addEventListener).not.toHaveBeenCalled()

  rerender(<RepinnedExample parent={parentFn} />)

  expect(parent.addEventListener.mock.calls[0][0]).toBe('scroll')
  expect(parent.addEventListener.mock.calls[1][0]).toBe('resize')
})

test('Repinned setHeightOffset updates the height in state', () => {
  const parent = getParent()
  let repinnedRef
  const setrepinnedRef = ref => {
    repinnedRef = ref
  }

  const { getByTestId } = render(
    <RepinnedExample parent={() => parent} repinnedRef={setrepinnedRef} />,
  )

  const height = '300px'
  repinnedRef.inner = {
    offsetHeight: height,
  }
  repinnedRef.setHeightOffset()
  expect(getByTestId('repinnedWrapper').style.height).toEqual(height)
})

test('Repinned handle scroll', async () => {
  let repinnedRef
  const setrepinnedRef = ref => {
    repinnedRef = ref
  }

  const onUnpinSpy = jest.fn()
  const onUnfixSpy = jest.fn()
  const onPinSpy = jest.fn()

  const parent = getParent()

  const { getByTestId } = render(
    <RepinnedExample
      onPin={onPinSpy}
      onUnpin={onUnpinSpy}
      onUnfix={onUnfixSpy}
      parent={() => parent}
      repinnedRef={setrepinnedRef}
    />,
  )

  parent.pageYOffset = 300
  repinnedRef.handleScroll()

  expect(getByTestId('RepinnedState')).toHaveTextContent('unpin')
  expect(onUnpinSpy).toHaveBeenCalledTimes(1)

  parent.pageYOffset = 180
  repinnedRef.handleScroll()

  expect(getByTestId('RepinnedState')).toHaveTextContent('pinned')
  expect(onPinSpy).toHaveBeenCalledTimes(1)

  parent.pageYOffset = 0
  repinnedRef.handleScroll()

  expect(getByTestId('RepinnedState')).toHaveTextContent('unfixed')
  expect(onUnfixSpy).toHaveBeenCalledTimes(1)
})

test('Repinned derives scrollY from scrollTop', async () => {
  let repinnedRef
  const setrepinnedRef = ref => {
    repinnedRef = ref
  }

  const parent = getParent()
  delete parent.pageYOffset
  parent.scrollTop = 30

  render(<RepinnedExample parent={() => parent} repinnedRef={setrepinnedRef} />)

  expect(repinnedRef.getScrollY()).toEqual(30)
})

test('Repinned getViewportHeight from window.innerHeight', async () => {
  let repinnedRef
  const setrepinnedRef = ref => {
    repinnedRef = ref
  }

  window.innerHeight = 1200

  render(<RepinnedExample repinnedRef={setrepinnedRef} />)

  expect(repinnedRef.getViewportHeight()).toEqual(1200)
})
