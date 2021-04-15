const indexName = `Pages`;

const pageQuery = `{
  pages: allContentfulBlogPost(sort: { fields: date, order: DESC }) {
    edges {
      node {
        id
        title
        slug
      }
    }
  }
}`;

function pageToAlgoliaRecord({ node: { id, title, slug, ...rest } }) {
  return {
    objectID: id,
    title,
    slug,
    ...rest,
  };
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

module.exports = queries;
