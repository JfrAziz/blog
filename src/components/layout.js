import React from "react"
import Header from "./Header"
import "./layout.scss"

const Layout = ({ children, width = "750px", showTitle = false }) => {
  return (
    <>
      <Header showTitle={showTitle} />
      <main>
        <div id="main-container" style={{maxWidth: width}}>
          {children}
        </div>
      </main>
    </>
  )
}

export default Layout
