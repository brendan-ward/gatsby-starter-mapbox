import React from 'react'
import PropTypes from 'prop-types'

import { Box, Flex } from 'components/Grid'
import styled, { themeGet } from 'style'

// This sidebar is responsive: it shrinks a bit in smaller viewports, then eventually expands to fill the full width
const Wrapper = styled(Box).attrs({
  width: ['100%', '350px', '470px'],
  flex: '0 0 auto',
})`
  border-right: 1px solid ${themeGet('colors.grey.800')};
  height: 100%;
`

// The inner wrapper provides the scroll container for the sidebar
// which allows vertical scrolling by default
const InnerWrapper = styled(Flex).attrs({
  flexDirection: 'column',
  flex: '1 1 auto',
})`
  overflow-x: hidden;
  overflow-y: ${({ allowScroll }) => (allowScroll ? 'auto' : 'hidden')};
  height: 100%;
`

const Sidebar = ({ children, allowScroll }) => (
  <Wrapper>
    <InnerWrapper allowScroll={allowScroll}>{children}</InnerWrapper>
  </Wrapper>
)

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  allowScroll: PropTypes.bool,
}

Sidebar.defaultProps = {
  allowScroll: true,
}

export default Sidebar
