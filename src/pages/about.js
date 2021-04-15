import * as React from 'react';

import { Container, Link, Paper, Typography } from '@material-ui/core';

import Header from '../components/header';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { makeStyles } from '@material-ui/core/styles';

// import '../layout/debug.css';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: '15%',
  },
  padding: {
    padding: theme.spacing(2),
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Header />
      <Seo title={`About`} />
      <Container component="main" maxWidth="sm" className={classes.container}>
        <Paper elevation={0} className={classes.padding}>
          <Typography variant="h4" gutterBottom>
            Hi there!
          </Typography>
          <Typography variant="body1" paragraph>
            You have come across a sample website. This is supposed to be a
            website to test a few of{' '}
            <Link color="secondary" href="https://www.gatsbyjs.com/">
              Gatsby
            </Link>{' '}
            features and integrations including Contentful, Netlify, SEO
            optimzations & more. All images were taken from{' '}
            <Link color="secondary" href="https://unsplash.com/">
              Unplash
            </Link>
            .
          </Typography>
          <Typography variant="body1" paragraph>
            Thanks{' '}
            <span role="img" aria-label="cat">
              🐈
            </span>
          </Typography>
        </Paper>
      </Container>
    </Layout>
  );
};

export default About;
