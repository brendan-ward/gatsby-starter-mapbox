const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  const config = {
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  }

  // when building HTML, window is not defined, so Leaflet causes the build to blow up
  if (stage === 'build-html') {
    config.module = {
      rules: [
        {
          test: /mapbox-gl/,
          use: loaders.null(),
        },
      ],
    }
  }

  actions.setWebpackConfig(config)
}

exports.onCreateNode = ({ node, actions: { createNodeField }, getNode }) => {
  const {
    internal: { type },
  } = node

  if (type === `Mdx`) {
    createNodeField({
      name: 'slug',
      node,
      value: createFilePath({ node, getNode }),
    })
  }
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
          return
        }

        const template = path.resolve(`./src/templates/MDXTemplate.jsx`)

        result.data.allMdx.edges.forEach(
          ({
            node: {
              id,
              fields: { slug },
            },
          }) => {
            createPage({
              path: slug,
              component: template,
              context: { id },
            })
          }
        )
      })
    )
  })
}
