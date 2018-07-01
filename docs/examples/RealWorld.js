import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ClickOutside } from 'react-goodies'

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

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Nav = styled.nav`
  position: relative;
`

const NavPopper = styled.div`
  position: absolute;
  padding: 16px;
  left: -9999999px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  opacity: 1;
  background-color: white;
  min-width: 280px;

  ${props =>
    props.active &&
    `
    left: auto;
    right: 0;
    opacity: 1;

  `};
`

class Page extends React.Component {
  state = {
    navExpanded: false,
  }

  handleClick = e => {
    this.props.parent().scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    e.target.blur()
  }

  toggleNav = e => {
    e.preventDefault()
    this.setState(state => ({
      navExpanded: !state.navExpanded,
    }))
  }

  render() {
    const { navExpanded } = this.state

    return (
      <Fragment>
        <Repinned {...this.props} forcePin={navExpanded}>
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
                    <Menu>
                      <Heading>repinned</Heading>
                      <ClickOutside
                        disabled={!navExpanded}
                        onClickOutside={this.toggleNav}
                      >
                        {({ setRef }) => (
                          <Nav innerRef={setRef}>
                            <button type="button" onClick={this.toggleNav}>
                              Menu
                            </button>
                            <NavPopper active={navExpanded}>
                              <ul>
                                <li>Menu Item 1</li>
                                <li>Menu Item 2</li>
                                <li>Menu Item 3</li>
                                <li>Menu Item 4</li>
                              </ul>
                            </NavPopper>
                          </Nav>
                        )}
                      </ClickOutside>
                    </Menu>
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
