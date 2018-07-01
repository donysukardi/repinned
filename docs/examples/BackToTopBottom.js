import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Repinned from 'repinned'

import Header from '../components/Header'
import BackToTopBottom from '../components/BackToTopBottom'
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
        <Repinned calcHeightOnResize={false} {...this.props}>
          {({ state }) => (
            <Fragment>
              <Header>
                <Container>
                  <HeaderWrapper>
                    <Heading>repinned</Heading>
                  </HeaderWrapper>
                </Container>
              </Header>
              <BackToTopBottom
                pinned={state === 'pinned'}
                onClick={this.handleClick}
              />
            </Fragment>
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
