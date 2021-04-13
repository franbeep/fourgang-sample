import * as React from 'react';

import { Box, Container, Typography } from '@material-ui/core';

import BlogEntry from '../components/blog-entry';
import CatsGroup from '../components/cats-group';
import Header from '../components/header';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: '15%',
  },
  catsgroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(10),
  },
}));

const IndexPage = ({ data }) => {
  const classes = useStyles();

  return (
    <Layout>
      <Header />
      <main>
        <Container maxWidth="sm" className={classes.container}>
          <Box color="text.primary" className={classes.catsgroup}>
            <CatsGroup />
            <Typography variant="h3" gutterBottom>
              Gang of Four (Cats)
            </Typography>
            <Typography variant="h5">blog</Typography>
          </Box>

          {data.allContentfulBlogPost.nodes.map((item, index) => (
            <BlogEntry key={index} entry={item} />
          ))}
        </Container>
      </main>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allContentfulBlogPost(sort: { fields: date, order: DESC }) {
      nodes {
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
`;
