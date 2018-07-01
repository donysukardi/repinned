import React from 'react'
import PropTypes from 'prop-types'
import { GoogleFont, TypographyStyle } from 'react-typography'

import Repinned from '../../src/index'
import typography from '../utils/typography'

import Header from '../components/Header'
import BackToTop from '../components/BackToTop'
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
    const { onUnfix, onPin, onUnpin } = this.props

    const { forcePin } = this.state

    return (
      <div>
        <GoogleFont typography={typography} />
        <TypographyStyle typography={typography} />
        <Repinned
          onUnfix={onUnfix}
          onPin={onPin}
          onUnpin={onUnpin}
          forcePin={forcePin}
        >
          {({ setRef, height, ...restProps }) => (
            <div
              style={{
                height
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
      </div>
    )
  }
}

Page.propTypes = {
  onUnfix: PropTypes.func,
  onPin: PropTypes.func,
  onUnpin: PropTypes.func,
}

export default Page
