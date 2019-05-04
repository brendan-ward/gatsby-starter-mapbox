// Mapbox public token.  TODO: migrate to .env setting
const mapboxToken =
  'pk.eyJ1IjoiYmN3YXJkIiwiYSI6InJ5NzUxQzAifQ.CVyzbyOpnStfYUQ_6r8AgQ'

/**
 * Map configuration information used to construct map and populate layers
 */
export const config = {
  accessToken: mapboxToken,
  center: [-120.9, 40.75],
  zoom: 4,
  minZoom: 1.75,
  styleID: 'light-v9',
  padding: 0.1, // padding around bounds as a proportion
}

export const sources = {}

export const layers = []
