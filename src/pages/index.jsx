import React from 'react'

import Layout from 'components/Layout'
import { Container } from 'components/Grid'
import { Link } from 'components/Link'

const IndexPage = () => (
  <Layout>
    <Container my="2rem">
      <h1>Welcome to the Gatsby starter for Mapbox GL!</h1>
      <h2>Check out some example map pages:</h2>
      <ul>
        <li>
          <Link to="/map">Map with Sidebar</Link>
        </li>
        <li>
          <Link to="/map-full">Full Screen Map</Link>
        </li>
        {/* <li>
          <Link to="/mdx-map">Map in MDX</Link>
        </li> */}
      </ul>
    </Container>
  </Layout>
)

export default IndexPage
