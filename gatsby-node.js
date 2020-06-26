const path = require("path")
const { createPath } = require("gatsby-source-filesystem")

//first create the slug for posts and pages
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({
      node,
      getNode,
      basePath: `content`,
    })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async({ graphql, actions }) => {
  const { createPage } = actions
  const content = await graphql(`
    {
      posts: allMardownRemark(
        filter: { frontmatter: { type: { eq: "posts" } } }

      ) {
        edges {
          node {
            frontmatter {
              published
            }
            fields {
              slug
            }
          }
        }
      }
      pages: allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "page" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // do nothing more if errror
  if(content.error) return

  const allPosts = content.data.posts.edges;
  const allPages = content.data.pages.edges;

  // create the individual post pages
  allPosts.forEach(({ node }) => {
    if(node.frontmatter.published){
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/Post.js`),
        context: {
          // data passed to context is available in page queries as GraphQL variables
          slug: node.fields.slug,
        },
      })
    }    
  })

  // create the individual page
  allPages.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/Page.js`),
      context: {
        // data passed to context is avilable in page queries as GraphQL variables
        slug: node.fields.slug,
      },
    })
  })
}

// for absolute imports
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}
