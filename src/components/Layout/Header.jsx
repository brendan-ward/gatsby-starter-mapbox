import React from 'react'
import { Text } from 'rebass'
import { FaGlobeAmericas as SiteLogo } from 'react-icons/fa'

import { Link } from 'components/Link'

import { Box, Flex } from 'components/Grid'
import styled, { themeGet } from 'style'
import { siteMetadata } from '../../../gatsby-config'

const Wrapper = styled(Flex).attrs({
  alignItems: 'center',
  justifyContent: 'space-between',
})`
  padding: 0.75rem 0.5rem;
  flex: 0 0 auto;
  border-bottom: 1px solid ${themeGet('colors.grey.900')};
`

const Title = styled(Text).attrs({
  as: 'h1',
})`
  margin: 0;
  flex-grow: 1;
  line-height: 1;

  & * {
    text-decoration: none;
  }
`

const NavBar = styled(Flex).attrs({
  alignItems: 'center',
})`
  font-size: 1.25rem;

  .nav-active {
    color: ${themeGet('colors.highlight.500')};
  }
`

const NavLink = styled(Link)`
  text-decoration: none;
  padding: 0 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`

const Header = () => (
  <Wrapper as="header">
    <Title>
      <Link to="/">
        <Flex alignItems="center" flexWrap="wrap">
          <Box mr="0.5rem">
            <SiteLogo />
          </Box>
          {siteMetadata.title}
        </Flex>
      </Link>
    </Title>
    <NavBar>
      <NavLink to="/map" activeClassName="nav-active">
        Map with Sidebar
      </NavLink>
      <NavLink to="/map-full" activeClassName="nav-active">
        Full Screen Map
      </NavLink>
    </NavBar>
  </Wrapper>
)

export default Header
