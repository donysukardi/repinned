import 'prismjs'
import 'prismjs/components/prism-jsx'

import React, { PureComponent } from 'react'
import prism from 'prismjs'
import styled, { cx } from 'react-emotion'

const PreStyled = styled('pre')`
  border: 1px solid ${p => p.theme.colors.border};
  margin: 2em 0;
  border-radius: 5px;
  background: ${p => p.theme.colors.preBg};
  ${p => p.theme.prismTheme};
  ${p => p.theme.mq(p.theme.styles.pre)};
`

export class Pre extends PureComponent {
  highlightCode() {
    prism.highlightElement(this.el)
  }

  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  render() {
    const { children } = this.props
    const childrenProps = children.props.props
    const childrenClassName = childrenProps && childrenProps.className
    const className = cx('react-prism', this.props.className, childrenClassName)

    return (
      <PreStyled innerRef={ref => (this.el = ref)} className={className}>
        <code>{children.props.children}</code>
      </PreStyled>
    )
  }
}
