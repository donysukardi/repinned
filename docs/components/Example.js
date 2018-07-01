import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { GoogleFont, TypographyStyle } from 'react-typography'
import IFrame from './IFrame'
import typography from '../utils/typography'
import { unwrapArray } from '../utils/utils'

const Example = ({ children: _children, ...props }) => {
  const children = unwrapArray(_children, () => {})
  const childrenFn = ({ win }) =>
    React.cloneElement(children, { parent: () => win })

  return (
    <IFrame {...props}>
      {({ doc, win }) => (
        <Fragment>
          <GoogleFont typography={typography} />
          <TypographyStyle typography={typography} />
          {childrenFn({ doc, win })}
        </Fragment>
      )}
    </IFrame>
  )
}

Example.propTypes = {
  children: PropTypes.node,
}

export default Example
