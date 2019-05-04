import { OutboundLink as Link } from 'gatsby-plugin-google-analytics'
import PropTypes from 'prop-types'

const OutboundLink = ({ to, target, children, ...props }) => (
  <Link href={to} target={target} {...props}>
    {children}
  </Link>
)

OutboundLink.propTypes = {
  to: PropTypes.string.isRequired,
  target: PropTypes.string,
  children: PropTypes.any.isRequired,
}

OutboundLink.defaultProps = {
  target: '_blank',
}

export default OutboundLink
