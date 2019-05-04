import React from 'react'

import Layout from 'components/Layout'
import Map from 'components/Map'
import Sidebar from 'components/Sidebar'
import { Box, Flex } from 'components/Grid'

import styled from 'style'

// this wrapper needs to be 100% to force map and sidebar to fill the full space
const Wrapper = styled(Flex)`
  height: 100%;
`

const MapPage = () => {
  return (
    <Layout title="Map with Sidebar">
      <Wrapper>
        <Sidebar>
          <Box p="1rem">Example sidebar content goes here</Box>
        </Sidebar>
        <Map />
      </Wrapper>
    </Layout>
  )
}

export default MapPage
