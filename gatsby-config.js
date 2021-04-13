require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Gang of Four',
    siteUrl: 'https://fourgang.netlify.app',
    description: 'The purfect blog with the laziest posts',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {},
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    'gatsby-plugin-use-query-params',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ganf of Four (Cats)`,
        short_name: `GoF`,
        start_url: `/`,
        background_color: `#fafafa`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.jpg`,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require('./src/utils/algolia-queries'),
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulBlogPost } }) => {
              return allContentfulBlogPost.nodes.map(node => {
                return {
                  slug: node.slug,
                  title: node.title,
                  authors: node.authors,
                  date: node.date,
                  url: site.siteMetadata.siteUrl + node.slug,
                  text: { 'content:encoded': node.text },
                };
              });
            },
            query: `
              {
                allContentfulBlogPost(sort: {fields: date, order: DESC}) {
                  nodes {
                    date(formatString: "MM/DD/YYYY")
                    slug
                    title
                    authors {
                      name
                    }
                    text {
                      raw
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'RSS Feed',
          },
        ],
      },
    },
  ],
};
