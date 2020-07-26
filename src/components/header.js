import React from "react"
import Logo from "../images/Logo"
import { Link } from "gatsby"
import { FISearch, FIX } from "../icons/Icon"
import "./header.css"
import { useState } from "react"

const Header = () => {
  const [search, setSearch] = useState("")
  return (
    <header>
      <div id="header-container">
        <div id="logo-container">
          <Link to={"/"}>
            <Logo height={30}/>
          </Link>
        </div>
        <div id="search-container">
          <div id="search-wrapper">
            <FISearch/>
            <input type="text" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)} value={search}/>
            <div id="reset-search" onClick={()=>setSearch("")}>
              <FIX/>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}


export default Header
