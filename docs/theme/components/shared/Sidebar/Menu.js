import * as React from 'react'
import { Entry } from 'docz'
import { Toggle } from 'react-powerplug'
import ChevronDown from 'react-feather/dist/icons/chevron-down'
import styled from 'react-emotion'

import { Link, linkStyle } from './Link'

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
`

export const MenuLink = styled('a')`
  ${linkStyle};
`

const iconRotate = p => (p.opened ? '-180deg' : '0deg')

const Icon = styled('div')`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%) rotate(${iconRotate});
  transform-origin: 50% 50%;
  transition: transform 0.3s;

  & svg {
    stroke: ${p => p.theme.colors.text};
  }
`

export const Menu = ({ menu, docs, sidebarToggle }) => (
  <Toggle initial={false}>
    {({ on, toggle }: any) => {
      const handleToggle = ev => {
        ev.preventDefault()
        toggle()
      }

      return (
        <Wrapper>
          <MenuLink href="#" onClick={handleToggle}>
            {menu}
            <Icon opened={on}>
              <ChevronDown size={15} />
            </Icon>
          </MenuLink>
          {on && (
            <dl>
              {docs.map(doc => (
                <dt key={doc.id}>
                  <Link onClick={sidebarToggle} to={doc.route} doc={doc}>
                    {doc.name}
                  </Link>
                </dt>
              ))}
            </dl>
          )}
        </Wrapper>
      )
    }}
  </Toggle>
)
