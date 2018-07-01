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
} from '../components/styles'

class Page extends React.Component {
  render() {
    const { onUnfix, onPin, onUnpin } = this.props

    return (
      <div>
        <GoogleFont typography={typography} />
        <TypographyStyle typography={typography} />
        <Repinned onUnfix={onUnfix} onPin={onPin} onUnpin={onUnpin}>
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
              <BackToTop pinned={restProps.state !== 'unfixed'} />
            </div>
          )}
        </Repinned>
        <Container>
          <ContentWrapper>
            <PageContent />
          </ContentWrapper>
        </Container>
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
