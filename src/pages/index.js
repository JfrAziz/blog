import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"

const IndexPage = ({data}) => {
  const { edges } = data.allMarkdownRemark
  return (
    <div>
      <SEO title="Home" />
      {
        edges.map((edge)=>{
          const {frontmatter} = edge.node
          return (
            <div key={frontmatter.slug}>
              <Link to={frontmatter.slug}>{frontmatter.title}</Link>
            </div>
          )
        })
      }
    </div>
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
            date
            excerpt
          }
        }
      }
    }
  }
`

export default IndexPage
export { query }
