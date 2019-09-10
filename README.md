# Gatsby starter with Mapbox GL

This starter gets you going quickly with Mapbox GL in Gatsby.

It uses React hooks to wrap the Mapbox GL JS object.

Because Mapbox GL is provided as a native JS object within `components/Map/index.jsx`, instead of a React Component, you need to coordinate application state directly with the map object.

Map configuration is stored in `config/map.js`. You need to provide basic map configuration such as initial `zoom` level, and you can provide optional `sources` and `layers` according to the Mapbox GL style specification.

You must set the environment variable `GATSBY_MAPBOX_API_TOKEN` to your Mapbox API token.
