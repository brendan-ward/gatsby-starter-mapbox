import React from 'react'

import Layout from 'components/Layout'
import { Container } from 'components/Grid'
import { Link } from 'components/Link'
import Map from 'components/Map'
import styled from 'style'

const Section = styled.section`
  h3 {
    margin-bottom: 0.25rem;
  }

  &:not(:first-child) {
    margin-top: 3rem;
  }
`

const IndexPage = () => (
  <Layout>
    <Container my="2rem">
      <h1>Welcome to the Gatsby starter for Mapbox GL!</h1>

      <Section>
        <h3>Example: a fixed size map:</h3>
        <Map width="400px" height="400px" />
      </Section>

      <Section>
        <h3>
          Example: a fluid map that fills the container and different styles:
        </h3>
        <Map height="400px" styles={['dark-v9', 'light-v9']} />
      </Section>

      <Section>
        <h3>Full page examples:</h3>
        <ul>
          <li>
            <Link to="/map">Map with Sidebar</Link>
          </li>
          <li>
            <Link to="/map-full">Full Screen Map</Link>
          </li>
          <li>
            <Link to="/map-geojson">Map with GeoJSON</Link>
          </li>
        </ul>
      </Section>
    </Container>
  </Layout>
)

export default IndexPage
