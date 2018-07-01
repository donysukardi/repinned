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
  CornerButtonWrapper,
} from '../components/styles'

class Page extends React.Component {
  state = {
    forcePin: false,
  }

  toggleForcePin = () => {
    this.setState(state => ({
      forcePin: !state.forcePin,
    }))
  }

  render() {
    const { forcePin } = this.state

    return (
      <Fragment>
        <Repinned {...this.props} forcePin={forcePin}>
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
            </div>
          )}
        </Repinned>
        <Container>
          <ContentWrapper>
            <PageContent />
          </ContentWrapper>
        </Container>
        <CornerButtonWrapper>
          <button
            data-testid="forcePinBtn"
            type="button"
            onClick={this.toggleForcePin}
          >
            {`Toggle Force Pin ${forcePin ? 'Off' : 'On'}`}
          </button>
        </CornerButtonWrapper>
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
