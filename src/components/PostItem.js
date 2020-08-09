import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import "./postItem.scss"

const PostItem = ({ slug, title, excerpt, image, category, readTime }) => (
  <div className="post-item">
    <div className="post-wrapper">
      <Img fluid={image} />
      <div className="post-description">
        <div>
          <Link to={`/post/${slug}`} className="title">{title}</Link>
          <div className="excerpt">{excerpt}</div>
        </div>
        <div className="post-category">
          <Link to={`/category/${category}`}>{category}</Link>
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  </div>
)

export default PostItem
