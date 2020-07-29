import React from 'react'
import { Link } from 'gatsby'
import Img from "gatsby-image"
import "./postItem.scss"

const PostItem = ({ slug, title, excerpt, image, category, readTime }) => (
  <div className="post-item">
    <Link to={slug}>
      <div className="post-tumbnail">
        <Img fluid={image} />
      </div>
      <div className="post-content">
        <div className="post-top">
          <div className="title">{title}</div>
          <div className="excerpt">{excerpt}</div>
        </div>
        <div className="post-category" >
          <a href="#" onClick={(e)=>e.stopPropagation()}>{category}</a>
          <span>{readTime}</span>
        </div>
      </div>
    </Link>
  </div>

)

export default PostItem
