import { Component } from 'react'
import PropTypes from 'prop-types'
import shallowequal from 'shallowequal'
import 'raf/polyfill'

import shouldUpdate from './shouldUpdate'
import { noop, unwrapArray } from './utils'

class Repinned extends Component {
  constructor(props) {
    super(props)
    // Class variables.
    this.currentScrollY = 0
    this.lastKnownScrollY = 0
    this.scrollTicking = false
    this.resizeTicking = false
    this.state = {
      state: props.forcePin ? 'pinned' : 'unfixed',
      shouldAnimate: false,
      height: 0,
    }
  }

  setRef = ref => {
    this.inner = ref
  }

  setHeightOffset = () => {
    this.setState(state =>
      state.height === this.inner.offsetHeight
        ? null
        : { height: this.inner.offsetHeight }
    )

    this.resizeTicking = false
  }

  getScrollY = () => {
    const parent = this.props.parent()
    /* istanbul ignore else  */
    if (parent.pageYOffset !== undefined) {
      return parent.pageYOffset
    } else if (parent.scrollTop !== undefined) {
      return parent.scrollTop
    }
    /* istanbul ignore next line */
    return (
      document.documentElement ||
      document.body.parentNode ||
      document.body
    ).scrollTop
  }

  getViewportHeight = () =>
    /* istanbul ignore next line */
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight

  getDocumentHeight = /* istanbul ignore next */ () => {
    const { body, documentElement } = document
    return Math.max(
      body.scrollHeight,
      documentElement.scrollHeight,
      body.offsetHeight,
      documentElement.offsetHeight,
      body.clientHeight,
      documentElement.clientHeight,
    )
  }

  getElementPhysicalHeight = elm => Math.max(elm.offsetHeight, elm.clientHeight)

  getElementHeight = elm =>
    Math.max(elm.scrollHeight, elm.offsetHeight, elm.clientHeight)

  getScrollerPhysicalHeight = () => {
    const parent = this.props.parent()

    return parent === window || parent === document.body
      ? /* istanbul ignore next */ this.getViewportHeight()
      : this.getElementPhysicalHeight(parent)
  }

  getScrollerHeight = () => {
    const parent = this.props.parent()

    return parent === window || parent === document.body
      ? /* istanbul ignore next */ this.getDocumentHeight()
      : this.getElementHeight(parent)
  }

  isOutOfBound = currentScrollY => {
    const pastTop = currentScrollY < 0

    const scrollerPhysicalHeight = this.getScrollerPhysicalHeight()
    const scrollerHeight = this.getScrollerHeight()

    const pastBottom = currentScrollY + scrollerPhysicalHeight > scrollerHeight

    return pastTop || pastBottom
  }

  handleScroll = () => {
    /* istanbul ignore else  */
    if (!this.scrollTicking) {
      this.scrollTicking = true
      window.requestAnimationFrame(this.update)
    }
  }

  handleResize = /* istanbul ignore next */ () => {
    /* istanbul ignore else  */
    if (!this.resizeTicking) {
      this.resizeTicking = true
      window.requestAnimationFrame(this.setHeightOffset)
    }
  }

  setNewState = state => {
    this.setState(prevState => ({
      state,
      shouldAnimate: prevState.state !== 'unfixed',
    }))
  }

  unpin = () => {
    this.props.onUnpin()
    this.setNewState('unpinned')
  }

  pin = () => {
    this.props.onPin()
    this.setNewState('pinned')
  }

  unfix = () => {
    this.props.onUnfix()
    this.setNewState('unfixed')
  }

  update = () => {
    this.currentScrollY = this.getScrollY()
    /* istanbul ignore else  */
    if (!this.isOutOfBound(this.currentScrollY)) {
      const { action } = shouldUpdate(
        this.lastKnownScrollY,
        this.currentScrollY,
        this.props,
        this.state,
        this.state.height
      )

      /* istanbul ignore else  */
      if (action === 'pin') {
        this.pin()
      } else if (action === 'unpin') {
        this.unpin()
      } else if (action === 'unfix') {
        this.unfix()
      }
    }

    this.lastKnownScrollY = this.currentScrollY
    this.scrollTicking = false
  }

  componentDidMount() {
    const { disabled, forcePin, parent: parentFn, calcHeightOnResize } = this.props
    this.setHeightOffset()

    const parent = parentFn()
    if (!disabled) {
      if(!forcePin) {
        parent.addEventListener('scroll', this.handleScroll)
      }
      if (calcHeightOnResize) {
        parent.addEventListener('resize', this.handleResize)
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowequal(this.props, nextProps) ||
      !shallowequal(this.state, nextState)
    )
  }

  componentDidUpdate(prevProps) {
    const parent = this.props.parent()
    if(this.props.forcePin && !prevProps.forcePin) {
      this.pin()
      parent.removeEventListener('scroll', this.handleScroll)
    } else if(!this.props.forcePin && prevProps.forcePin) {
      parent.addEventListener('scroll', this.handleScroll)
    }

    if (this.props.disabled && !prevProps.disabled) {
      this.unfix()
      parent.removeEventListener('scroll', this.handleScroll)
      parent.removeEventListener('resize', this.handleResize)
    } else if (!this.props.disabled && prevProps.disabled) {
      parent.addEventListener('scroll', this.handleScroll)
      /* istanbul ignore else  */
      if (this.props.calcHeightOnResize) {
        parent.addEventListener('resize', this.handleResize)
      }
    }
  }

  componentWillUnmount() {
    const parent = this.props.parent()
    parent.removeEventListener('scroll', this.handleScroll)
    /* istanbul ignore else  */
    if (parent !== window) {
      window.removeEventListener('scroll', this.handleScroll)
    }
    parent.removeEventListener('resize', this.handleResize)
  }

  render() {
    const children = unwrapArray(this.props.children, noop)

    return children({
      setRef: this.setRef,
      ...this.state,
    })
  }
}

Repinned.propTypes = {
  parent: PropTypes.func,
  children: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  upTolerance: PropTypes.number,
  downTolerance: PropTypes.number,
  onPin: PropTypes.func,
  onUnpin: PropTypes.func,
  onUnfix: PropTypes.func,
  pinStart: PropTypes.number,
  forcePin: PropTypes.bool,
  calcHeightOnResize: PropTypes.bool,
}

Repinned.defaultProps = {
  parent: () => window,
  forcePin: false,
  disabled: false,
  upTolerance: 5,
  downTolerance: 5,
  onPin: noop,
  onUnpin: noop,
  onUnfix: noop,
  pinStart: 0,
  calcHeightOnResize: true,
}

export default Repinned
