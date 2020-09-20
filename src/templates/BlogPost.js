import React from "react"
import { graphql, Link } from "gatsby"
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import Layout from "../components/Layout"
import Img from "gatsby-image"
import "./blogPost.scss"
import "./markdownTheme.scss"
import SEO from "../components/SEO"

deckDeckGoHighlightElement();

const BlogPost = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark
  return (
    <Layout showTitle={true}>
      <SEO title={frontmatter.title} description={frontmatter.excerpt}/>
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{frontmatter.title}</h1>
          <div className="subtitle">
            <span className="subtitle-item category">
              <Link to={`/category/${frontmatter.category}`}>{frontmatter.category}</Link>
            </span>
            <span className="subtitle-item date">{frontmatter.date}</span>
          </div>
          <div className="image-tumbnail">
            <Img fluid={frontmatter.tumbnail.childImageSharp.fluid} />
          </div>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  )
}

const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        excerpt
        slug
        title
        category
        tumbnail {
          childImageSharp {
            fluid(maxWidth: 750) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default BlogPost
export { pageQuery }
