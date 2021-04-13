import * as React from 'react';

import { Box, Container, Typography } from '@material-ui/core';
import { StringParam, useQueryParam } from 'use-query-params';

import Header from '../components/header';
import Layout from '../components/layout';
import Search from '../components/search';
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

  const searchIndices = [{ name: `Pages`, title: `Pages` }];

  return (
    <Layout>
      <Header />
      <Container maxWidth="sm" className={classes.container}></Container>
      <Box color="text.primary" className={classes.catsgroup}>
        {/* <Search indices={searchIndices} /> */}
      </Box>
    </Layout>
  );
};

export default Page404;
