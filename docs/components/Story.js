import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { GoogleFont, TypographyStyle } from 'react-typography'
import typography from '../utils/typography'

const Story = ({ children }) => (
  <Fragment>
    <GoogleFont typography={typography} />
    <TypographyStyle typography={typography} />
    {children}
  </Fragment>
)

Story.propTypes = {
  children: PropTypes.node,
}

export default Story
