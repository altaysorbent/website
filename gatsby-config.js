module.exports = {
  siteMetadata: {
    title: `Altaysorbent`,
    description: `Алтайсорбент - 100% натуральный кремнесодержащий энтеросорбент с широким спектром действия`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Altaysorbent`,
        short_name: `Altaysorbent`,
        start_url: `/`,
        background_color: `#2f6844`,
        theme_color: `#71bf8f`,
        display: `standalone`,
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
        ],
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/css/main.css`],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `limelight`,
          `source sans pro\:400,700`, // you can also specify font weights and styles
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
