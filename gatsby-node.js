const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
  const searchPostTemplate = path.resolve(`src/templates/search.js`);

  return graphql(
    `
      query loadPagesQuery($limit: Int!) {
        allContentfulBlogPost(
          sort: { fields: date, order: DESC }
          limit: $limit
        ) {
          edges {
            node {
              date(formatString: "MM/DD/YYYY")
              slug
              title
              text {
                raw
              }
              authors {
                avatar {
                  gatsbyImageData(
                    quality: 100
                    width: 200
                    height: 200
                    formats: WEBP
                    layout: FIXED
                    placeholder: BLURRED
                  )
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

    // Create (naive) search page
    // createPage({
    //   path: `search`,
    //   component: searchPostTemplate,
    //   context: {
    //     nodes: result.data.allContentfulBlogPost.edges,
    //   },
    // });
  });
};
