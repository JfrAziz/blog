import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import "./postItem.scss"

const PostItem = ({ slug, title, excerpt, image, category, readTime }) => (
  <div className="post-item">
    <a className="post-wrapper" href={`/post/${slug}`}>
      <div className="post-tumbnail">
        <Img fluid={image} />
      </div>
      <div className="post-content">
        <div className="post-top">
          <div className="title">{title}</div>
          <div className="excerpt">{excerpt}</div>
        </div>
        <div className="post-category">
          <Link to={`/category/${category}`}>{category}</Link>
          <span>{readTime}</span>
        </div>
      </div>
    </a>
  </div>
)

export default PostItem
