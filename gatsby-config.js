module.exports = {
  siteMetadata: {
    title: "Quick News",
    description: "Load news faster",
    url: "https://quick-news.pages.dev",
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/icon.png',
      },
    },
  ]
}