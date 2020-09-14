module.exports = {
  siteMetadata: {
    title: `Jafar Aziz's Blog`,
    description: `My programming notes`,
    author: `@jfrAziz`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              theme: 'one-light'
            }
          },
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
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-page-progress",
      options: {
        height: 3,
        prependToBody: false,
        color: `#663399`,
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#663399`,
        showSpinner: false,
      },
    },
  ],
}
