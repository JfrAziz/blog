import React from 'react'
import Layout from "../components/Layout_temp"
import PostItem from "../components/PostItem"
import SEO from "../components/SEO_temp"
import "./postList.scss"


const Category = ({ data, pageContext }) => {
  const { edges } = data.allMarkdownRemark
  const { category } = pageContext
  return (
    <Layout width="1200px">
      <SEO title={`Category "${category}"`} />
      <div id="category-title">
        <h3>{category}</h3>
      </div>
      <div id="all-post-container">
        {edges.map(edge => {
          const { frontmatter, fields } = edge.node
          const { slug, title, excerpt, category, tumbnail } = frontmatter
          const { text } = fields.readingTime
          let tumbnailFluid = tumbnail.childImageSharp.fluid
          return (
            <PostItem
              key={slug}
              slug={slug}
              title={title}
              excerpt={excerpt}
              category={category}
              image={tumbnailFluid}
              readTime={text}
            />
          )
        })}
      </div>
    </Layout>
  )
}

const query = graphql`
  query($category: String) {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {category: {eq: $category}}}) {
      edges {
        node {
          id
          frontmatter {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
            excerpt
            category
            tumbnail {
              childImageSharp {
                fluid(maxWidth: 360, maxHeight: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            readingTime {
              text
            }
          }
        }
      }
    }
  }  
`

export default Category
export { query }