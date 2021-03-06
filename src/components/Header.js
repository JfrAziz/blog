import React from "react"
import Logo from "../images/Logo"
import { Link } from "gatsby"
import "./header.scss"

const Header = ({showTitle = false}) => {
  return (
    <header>
      <div id="header-container">
        <div id="logo-container">
          <Link to={"/"}>
            <Logo height={30}/>
            {
              showTitle && (
                <div id="logo-text">
                  Jafar Aziz
                </div>
              )
            }
          </Link>
          
        </div>
      </div>
    </header>
  )
}


export default Header
