import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Frame, { FrameContextConsumer } from 'react-frame-component'
import styled, { StyleSheetManager } from 'styled-components'
import { width, height } from 'styled-system'

const StyledFrame = styled(Frame)`
  width: 100%;
  min-height: 480px;
  box-shadow: 0 2px 43px -4px rgba(0, 0, 0, 0.19);
  border: none;
  border-radius: 8px;
  overflow: hidden;
  ${width} ${height};
`

const IFrame = ({ children, ...props }) => (
  <StyledFrame {...props}>
    <FrameContextConsumer>
      {// Callback is invoked with iframe's window and document instances
      ({ document: doc, window: win }) => (
        <StyleSheetManager target={doc.head}>
          {children({ doc, win })}
        </StyleSheetManager>
      )}
    </FrameContextConsumer>
  </StyledFrame>
)

IFrame.propTypes = {
  children: PropTypes.func,
}

export default IFrame
