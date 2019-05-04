import React from 'react'
import PropTypes from 'prop-types'

import { Box } from 'components/Grid'
import Map from './Map'

const EmbeddedMap = ({ width, height, ...props }) => {
  return (
    <Box width={width} height={height} {...props}>
      <Map />
    </Box>
  )
}

EmbeddedMap.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
}

EmbeddedMap.defaultProps = {
  width: '400px',
  height: '400px',
}

export default EmbeddedMap
