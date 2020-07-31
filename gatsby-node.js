exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const post = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  post.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/post/${node.frontmatter.slug}`,
      component: require.resolve(`./src/templates/BlogPost.js`),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })


  const category = await graphql(`
    {
      allMarkdownRemark {
        group(field: frontmatter___category) {
          fieldValue
        }
      }
    }
  `)

  category.data.allMarkdownRemark.group.forEach(({fieldValue})=> {
    createPage({
      path: `/category/${fieldValue}`,
      component: require.resolve(`./src/templates/Category.js`),
      context: {
        category: fieldValue,
      },
    })
  })

  
}