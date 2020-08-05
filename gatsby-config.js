module.exports = {
  siteMetadata: {
    title: `Jafar Aziz's Blog`,
    description: `An ordinary blogger, programmer, and self learner`,
    author: `@jfrAziz`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-reading-time`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: "gatsby-remark-embed-youtube",
            options: {
              width: 730,
              height: 400
            }
          },
          "gatsby-remark-responsive-iframe"
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/post`,
        name: `post`,
      },
    },
    `gatsby-plugin-sass`
  ],
}
