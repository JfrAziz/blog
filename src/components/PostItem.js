import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import "./postItem.scss"

const PostItem = ({ slug, title, excerpt, image, category, readTime }) => (
  <div className="post-item">
    <a className="post-wrapper" href={`/post/${slug}`}>
      <Img fluid={image} />
      <div className="post-description">
        <div>
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
