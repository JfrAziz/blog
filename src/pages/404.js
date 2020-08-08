import React from "react"
import Layout from "../components/layout"
import SEO from "../components/SEO"
import "./404.scss"

const NotFoundPage = () => (
  <Layout showTitle={true}>
    <SEO title="404: Not found" />
    <div id="not-found-container">
      <h1>404</h1>
      <h1>NOT FOUND</h1>
    </div>
  </Layout>
)

export default NotFoundPage
