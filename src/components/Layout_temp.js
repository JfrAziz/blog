import React from "react"
import Header from "./Header_temp"
import "./layout.scss"
import Footer from "./Footer"

const Layout = ({ children, width = "750px", showTitle = false }) => {
  return (
    <>
      <Header showTitle={showTitle} />
      <main>
        <div id="main-container" style={{maxWidth: width}}>
          {children}
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default Layout
