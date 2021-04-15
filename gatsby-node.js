const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);

  return graphql(
    `
      query getAllPosts($limit: Int!) {
        allContentfulBlogPost(
          sort: { fields: date, order: DESC }
          limit: $limit
        ) {
          edges {
            node {
              createdAt: date
              modifiedAt: date
              slug
              title
              text {
                raw
              }
              authors {
                avatar {
                  gatsbyImageData(
                    quality: 100
                    width: 220
                    height: 220
                    formats: WEBP
                    layout: FIXED
                    placeholder: BLURRED
                    outputPixelDensities: 1
                  )
                  fixed(quality: 100, height: 220, width: 220) {
                    src
                  }
                }
                name
              }
            }
          }
        }
      }
    `,
    { limit: 1000 }
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog post pages.
    result.data.allContentfulBlogPost.edges.forEach(edge => {
      createPage({
        path: `${edge.node.slug}`,
        component: blogPostTemplate,
        context: {
          ...edge.node,
        },
      });
    });
  });
};
