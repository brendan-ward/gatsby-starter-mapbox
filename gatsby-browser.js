import GoogleAnalytics from 'react-ga'
import { siteMetadata } from './gatsby-config'

/**
 * Initialize Google Analytics
 */
export const onClientEntry = () => {
  if (process.env.NODE_ENV === 'production') {
    GoogleAnalytics.initialize(siteMetadata.googleAnalyticsId)
  }
}
