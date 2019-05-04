/* eslint-disable max-len, no-underscore-dangle */
import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { Flex } from 'components/Grid'
import styled from 'style'
import { hasWindow } from 'util/dom'

import { config, sources, layers } from '../../../config/map'

// this wrapper needs to be 100% to force it to fill the full space
const Wrapper = styled(Flex)`
  height: 100%;
`

// This wrapper must be positioned relative for the map to be able to lay itself out properly
const Relative = styled.div`
  position: relative;
  flex: 1 0 auto;
`

const Map = () => {
  // if there is no window, we cannot render this component
  if (!hasWindow) {
    return null
  }

  // this ref holds the map DOM node so that we can pass it into Mapbox GL
  const mapNode = useRef(null)

  // this ref holds the map object once we have instantiated it, so that we
  // can use it in other hooks
  const mapRef = useRef(null)

  // construct the map within an effect that has no dependencies
  // this allows us to construct it only once at the time the
  // component is constructed.
  useEffect(() => {
    const { accessToken, styleID, center, zoom } = config

    mapboxgl.accessToken = accessToken

    const map = new mapboxgl.Map({
      container: mapNode.current,
      style: `mapbox://styles/mapbox/${styleID}`,
      center: center || [0, 0],
      zoom: zoom || 0,
      minZoom: config.minZoom || 0,
    })
    mapRef.current = map
    window.map = map // for easier debugging and querying via console

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('load', () => {
      // add sources
      Object.entries(sources).forEach(([id, source]) => {
        map.addSource(id, source)
      })

      // add layers
      layers.forEach(layer => {
        map.addLayer(layer)
      })
    })

    // hook up map events here, such as click, mouseenter, mouseleave
    // e.g., map.on('click', (e) => {})

    // when this component is destroyed, remove the map
    return () => {
      map.remove()
    }
  }, [])

  // You can use other `useEffect` hooks to update the state of the map
  // based on incoming props.  Just beware that you might need to add additional
  // refs to share objects or state between hooks.

  return (
    <Wrapper>
      <Relative>
        <div ref={mapNode} style={{ width: '100%', height: '100%' }} />
      </Relative>
    </Wrapper>
  )
}

export default Map
