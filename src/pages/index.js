import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout_temp"
import PostItem from "../components/PostItem"
import SEO from "../components/SEO_temp"
import "./index.scss"
import "../templates/postList.scss"

const Index = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <Layout width="1200px">
      <SEO title="Home"/>
      <div id="blog-title">
        <h1>Jafar Aziz's Blog</h1>
        <h3>An ordinary blogger, programmer, and self learner</h3>
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
  query HomePageQuery {
    allMarkdownRemark {
      totalCount
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

export default Index
export { query }
