import React from 'react'
import { Link } from 'gatsby'
import Img from "gatsby-image"
import "./postItem.css"

const PostItem = ({ slug, title, excerpt, tags = [], image }) => (
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
        <div className="tags-contaiener">
          {
            tags.map((item, index) => <span className="tags" key={index}>#{item}</span>)
          }
        </div>
      </div>
    </Link>
  </div>

)

export default PostItem
