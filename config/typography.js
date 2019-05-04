import Typography from 'typography'
import typeographyTheme from 'typography-theme-noriega'

import { theme } from 'style'

typeographyTheme.overrideThemeStyles = () => ({
  html: {
    //   overflowY: 'scroll',
    height: '100%',
  },
  body: {
    height: '100%',
    width: '100%',
  },
  // Set height on containing notes to 100% so that full screen map layouts work
  '#___gatsby': {
    height: '100%',
  },
  '#___gatsby > *': {
    height: '100%',
  },
  button: {
    outline: 'none',
    cursor: 'pointer',
  },
  'a, a:visited, a:active': {
    color: theme.colors.link,
  },
})

const typography = new Typography(typeographyTheme)

export default typography
