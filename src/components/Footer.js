import React from 'react'
import "./footer.scss"
import { Link } from 'gatsby'

const Footer = () => (
  <footer>
    <div id="footer-container">
      <div id="footer-left">
        <span>© {new Date().getFullYear()} <a href="https://twitter.com/JfrAziz">Jafar Aziz</a></span>
      </div>
    </div>
  </footer>
)

export default Footer