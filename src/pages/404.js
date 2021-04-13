import * as React from 'react';

import { Box, Container, Typography } from '@material-ui/core';
import { StringParam, useQueryParam } from 'use-query-params';

import Header from '../components/header';
import Layout from '../components/layout';
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
  verticalPadding: {
    padding: theme.spacing(5),
  },
}));

const Page404 = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Header />
      <main>
        <Container maxWidth="sm" className={classes.container}>
          <Box color="text.primary" className={classes.catsgroup}>
            <Typography variant="h1" gutterBottom>
              404
            </Typography>
            <Typography variant="h3" gutterBottom>
              Resource not Found{' '}
              <span role="img" aria-label="angry cat">
                😾
              </span>
            </Typography>
          </Box>
        </Container>
      </main>
    </Layout>
  );
};

export default Page404;
