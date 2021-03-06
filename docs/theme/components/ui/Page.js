import React, { Fragment } from 'react'
import styled from 'react-emotion'

export const Container = styled('div')`
  margin: 0 auto;
  width: 960px;
  max-width: 100%;
  ${p => p.theme.mq(p.theme.styles.container)};
`

const Wrapper = styled('div')`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  color: ${p => p.theme.colors.text};
  background: ${p => p.theme.colors.background};
`

export const Page = ({ children, doc, ...props }) => (
  <Fragment>
    {!doc.raw ? (
      <Wrapper>
        <Container>{children}</Container>
      </Wrapper>
    ) : (
      children
    )}
  </Fragment>
)
