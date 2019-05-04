// import React from 'react'
// import PropTypes from 'prop-types'
// import { graphql } from 'gatsby'
// import MDXRenderer from 'gatsby-mdx/mdx-renderer'

// import Layout from 'components/Layout'
// import { Flex } from 'components/Grid'
// import styled from 'style'

// const Wrapper = styled(Flex).attrs({ flexDirection: 'column' })`
//   height: 100%;
// `

// const Content = styled.div`
//   flex: 1 1 auto;
// `

// const MDXTemplate = ({
//   data: {
//     mdx: {
//       code: { body },
//       frontmatter: {
//         title,
//         headerImage: { src: img, author, url },
//       },
//     },
//   },
// }) => {
//   const headerImage = img
//     ? {
//         img,
//         author,
//         url,
//       }
//     : null

//   return (
//     <Layout title={title} headerImage={headerImage}>
//       <Content>
//         <MDXRenderer>{body}</MDXRenderer>
//       </Content>
//     </Layout>
//   )
// }

// MDXTemplate.propTypes = {
//   data: PropTypes.shape({ mdx: PropTypes.object.isRequired }).isRequired,
// }

// export const pageQuery = graphql`
//   query PageQuery($id: String!) {
//     mdx(id: { eq: $id }) {
//       frontmatter {
//         title
//         headerImage {
//           src {
//             childImageSharp {
//               fluid(maxWidth: 3200) {
//                 ...GatsbyImageSharpFluid_withWebp
//               }
//             }
//           }
//           author
//           url
//         }
//       }
//       code {
//         body
//       }
//     }
//   }
// `

// export default MDXTemplate
