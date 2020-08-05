import React from 'react'
import Logo from "../images/Logo"
import "./footer.scss"
import { useStaticQuery, graphql, Link } from "gatsby"
import { FITwitter, FIGithub } from '../icons/Icon'

const Footer = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )
  return (
    <footer>
      <div id="footer-container">
        <div id="footer-left">
          <div id="footer-logo">
            <Logo height={24}/>
          </div>
          <div id="foot-desc">{site.siteMetadata.description}</div>
          <div id="author-link">
            <Link to="https://twitter.com/JfrAziz"><FITwitter/></Link>
            <Link to="https://github.com/JfrAziz"><FIGithub/></Link>
          </div>
          <div id="author-name">Copyright <Link to="https://twitter.com/JfrAziz">Jafar Aziz</Link> {new Date().getFullYear()}</div>
          <div id="made-by">Made with <Link to="https://gatsbyjs.org">gatsby.js</Link> and love</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer