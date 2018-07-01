import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Repinned from 'repinned'

import Header from '../components/Header'
import BackToTop from '../components/BackToTop'
import PageContent from '../components/PageContent'
import {
  Container,
  HeaderWrapper,
  ContentWrapper,
  Heading,
} from '../components/styles'

class Page extends React.Component {
  handleClick = e => {
    this.props.parent().scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    e.target.blur()
  }

  render() {
    return (
      <Fragment>
        <Repinned {...this.props}>
          {({ setRef, height, ...restProps }) => (
            <div
              style={{
                height,
              }}
            >
              <Header
                innerRef={setRef}
                data-testid="headerContainer"
                data-state={restProps.state}
                {...restProps}
              >
                <Container>
                  <HeaderWrapper>
                    <Heading>repinned</Heading>
                  </HeaderWrapper>
                </Container>
              </Header>
              <BackToTop
                pinned={restProps.state !== 'unfixed'}
                onClick={this.handleClick}
              />
            </div>
          )}
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
  onUnfix: PropTypes.func,
  onPin: PropTypes.func,
  onUnpin: PropTypes.func,
}

export default Page
