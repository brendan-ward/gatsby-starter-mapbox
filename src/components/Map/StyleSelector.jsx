import React, { useState, useRef } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { fromJS } from 'immutable'

import styled, { css, themeGet } from 'style'

const Wrapper = styled.div`
  /* cursor: pointer;
  position: absolute;
  left: 10px;
  bottom: 24px;
  z-index: 999; */
`

const Basemap = styled.img`
  box-sizing: border-box;
  border: 2px solid
    ${({ isActive }) => (isActive ? themeGet('colors.highlight.500') : '#fff')};
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  margin: 0;

  ${({ size }) => css`
    width: ${size};
    height: ${size};
    border-radius: ${size};
  `}

  &:not(:first-child) {
    margin-left: 0.25rem;
  }
`

const getSrc = ({ styleID, z, x, y, token }) =>
  `https://api.mapbox.com/styles/v1/mapbox/${styleID}/tiles/256/${z}/${x}/${y}?access_token=${token}`

const StyleSelector = ({ map, token, styles, tile, size, onChange }) => {
  console.log('render StyleSelector')

  map.on('style.load', () => {
    console.log('style load')
  })

  const [basemap, setBasemap] = useState(styles[0])
  const [isOpen, setIsOpen] = useState(false)
  const baseStyleRef = useRef(null)

  map.once('style.load', () => {
    baseStyleRef.current = fromJS(map.getStyle())
  })

  const handleBasemapClick = newBasemap => {
    console.log('handle click', newBasemap)
    setIsOpen(false)

    if (newBasemap === basemap) return

    setBasemap(newBasemap)

    const { current: baseStyle } = baseStyleRef

    const snapshot = fromJS(map.getStyle())
    const baseSources = baseStyle.get('sources')
    const baseLayers = baseStyle.get('layers')

    // diff the sources and layers to find those added by the user
    const userSources = snapshot
      .get('sources')
      .filter((_, key) => !baseSources.has(key))
    const userLayers = snapshot
      .get('layers')
      .filter(layer => !baseLayers.includes(layer))

    map.setStyle(`mapbox://styles/mapbox/${newBasemap}`)

    map.once('style.load', () => {
      console.log('on style update')
      // after new style has loaded
      // save it so that we can diff with it on next change
      // and re-add the sources / layers back on it

      // save base for new style
      baseStyleRef.current = fromJS(map.getStyle())

      userSources.forEach((source, id) => {
        map.addSource(id, source.toJS())
      })

      userLayers.forEach(layer => {
        map.addLayer(layer.toJS())
      })

      onChange(newBasemap)
    })
  }

  const toggleOpen = () => {
    setIsOpen(true)
  }

  const toggleClosed = () => {
    setIsOpen(false)
  }

  // if there are only 2 options, render as a toggle
  if (styles.length === 2) {
    const nextBasemap = basemap === styles[0] ? styles[1] : styles[0]

    return (
      <Wrapper>
        <Basemap
          size={size}
          src={getSrc({ styleID: nextBasemap, token, ...tile })}
          onClick={() => handleBasemapClick(nextBasemap)}
        />
      </Wrapper>
    )
  }

  const nextBasemap = styles.filter(style => style !== basemap)[0]

  return (
    <Wrapper onMouseEnter={toggleOpen} onMouseLeave={toggleClosed}>
      {isOpen ? (
        <>
          <Basemap
            size={size}
            src={getSrc({ styleID: nextBasemap, token, ...tile })}
            onClick={() => handleBasemapClick(nextBasemap)}
          />
          {styles
            .filter(style => style !== nextBasemap)
            .map(styleID => (
              <Basemap
                key={styleID}
                isActive={styleID === basemap}
                size={size}
                src={getSrc({ styleID, token, ...tile })}
                onClick={() => handleBasemapClick(styleID)}
              />
            ))}
        </>
      ) : (
        <Basemap
          size={size}
          src={getSrc({ styleID: nextBasemap, token, ...tile })}
          onClick={toggleOpen}
        />
      )}
    </Wrapper>
  )
}

StyleSelector.propTypes = {
  map: PropTypes.object,
  token: PropTypes.string.isRequired,
  // list of mapbox style IDs
  styles: PropTypes.arrayOf(PropTypes.string).isRequired,
  tile: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired,
  }),
  size: PropTypes.string,
  onChange: PropTypes.func,
}

StyleSelector.defaultProps = {
  map: null,
  tile: {
    x: 0,
    y: 0,
    z: 0,
  },
  size: '64px',
  onChange: () => {},
}

// Wrap in a Mapbox GL plugin so that we can construct the above React element on map init
// TODO: pass props through
class Plugin {
  constructor({ styles, token, position }) {
    this.styles = styles
    this.token = token
    this.position = position
  }

  onAdd(map) {
    console.log('onAdd')
    this.map = map

    const { styles, token } = this

    this.container = document.createElement('div')
    this.container.classList.add('mapboxgl-ctrl')
    this.container.classList.add('mapboxgl-ctrl-style-selector')
    this.container.style.float = 'none !important'
    this.container.style.cursor = 'pointer'

    render(
      <StyleSelector map={map} styles={styles} token={token} />,
      this.container
    )

    return this.container
  }

  init() {
    console.log('init')
    const { map, styles, token, container } = this
    render(<StyleSelector map={map} styles={styles} token={token} />, container)
  }

  onRemove() {
    this.map = null
    this.container.parentNode.removeChild(this.container)
  }
}

export default Plugin
