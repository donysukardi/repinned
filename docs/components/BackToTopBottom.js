import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transition: all 0.2s ease-in-out;
  ${props =>
    props.pinned
      ? `
    transform: translateX(-50%);
  `
      : `
    transform: translateX(-50%) translateY(100%);
  `};
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px 8px 0 0;
  white-space: nowrap;
`

class BackToTop extends React.Component {
  render() {
    const { pinned, onClick } = this.props
    return (
      <Wrapper pinned={pinned}>
        <Button type="button" onClick={onClick}>
          Back to Top
        </Button>
      </Wrapper>
    )
  }
}

export default BackToTop
