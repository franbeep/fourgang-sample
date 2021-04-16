import * as React from 'react';

import { Container, Typography } from '@material-ui/core';

import Header from '../components/header';
import Layout from '../components/layout';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: '15%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Page404 = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Header />
      <Container component="main" maxWidth="sm" className={classes.container}>
        <Typography variant="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h3" gutterBottom>
          Resource not Found{' '}
          <span role="img" aria-label="angry cat">
            😾
          </span>
        </Typography>
      </Container>
    </Layout>
  );
};

export default Page404;
