import React from "react"
import Header from "./Header"
import "./layout.css"

const Layout = ({ children, width = "750px" }) => {
  return (
    <>
      <Header />
      <main>
        <div id="main-container" style={{maxWidth: width}}>
          {children}
        </div>
      </main>
    </>
  )
}

export default Layout
