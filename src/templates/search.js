import * as React from 'react';

import { Box, Container, Paper, Typography } from '@material-ui/core';
import { StringParam, useQueryParam } from 'use-query-params';

import BlogEntry from '../components/blog-entry';
import Header from '../components/header';
import Layout from '../components/layout';
import { makeStyles } from '@material-ui/core/styles';

const searchEntry = (query, entry) => {
  return JSON.stringify(entry).includes(query) ? entry : null;
};

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
  verticalPadding: {
    padding: theme.spacing(5),
  },
}));

const Search = ({ pageContext }) => {
  const classes = useStyles();

  /* eslint-disable no-unused-vars */
  const [query, setQuery] = useQueryParam('q', StringParam);

  const entries = pageContext.nodes
    .filter(entry => searchEntry(query, entry))
    .map(item => item.node);

  return (
    <Layout>
      <Header />
      <main>
        <Container maxWidth="sm" className={classes.container}>
          <Box color="text.primary" className={classes.catsgroup}>
            <Typography variant="h3" gutterBottom>
              Search results for: {query}
            </Typography>
          </Box>

          {!entries.length && (
            <Paper elevation={0} className={classes.verticalPadding}>
              <Typography variant="h5" align="center">
                No posts found 😿
              </Typography>
            </Paper>
          )}

          {entries.map((item, index) => (
            <BlogEntry key={index} entry={item} />
          ))}
        </Container>
      </main>
    </Layout>
  );
};

export default Search;
