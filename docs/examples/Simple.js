import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Repinned from 'repinned'

import Header from '../components/Header'
import PageContent from '../components/PageContent'
import {
  Container,
  HeaderWrapper,
  ContentWrapper,
  Heading,
} from '../components/styles'

class Page extends React.Component {
  render() {
    const { sticky, ...rest } = this.props

    return (
      <Fragment>
        <Repinned calcHeightOnResize={!sticky} {...rest}>
          {({ setRef, height, ...restProps }) => {
            const content = (
              <Header
                innerRef={setRef}
                data-testid="headerContainer"
                data-state={restProps.state}
                sticky={sticky}
                {...restProps}
              >
                <Container>
                  <HeaderWrapper>
                    <Heading>repinned</Heading>
                  </HeaderWrapper>
                </Container>
              </Header>
            )

            return sticky ? content : <div style={{ height }}>{content}</div>
          }}
        </Repinned>
        <Container>
          <ContentWrapper>
            <PageContent />
          </ContentWrapper>
        </Container>
      </Fragment>
    )
  }
}

Page.propTypes = {
  sticky: PropTypes.bool,
  onUnfix: PropTypes.func,
  onPin: PropTypes.func,
  onUnpin: PropTypes.func,
}

export default Page
