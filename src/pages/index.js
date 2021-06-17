import * as React from 'react';

import { Box, Container, Typography } from '@material-ui/core';

import BlogEntry from '../components/blog-entry';
import CatsGroup from '../components/cats-group';
import Header from '../components/header';
// import Layout from '../components/layout';
import WallpaperLayout from '../components/wallpaper-layout';
import Seo from '../components/seo';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    'paddingTop': '150px',
    'marginBottom': '100px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      paddingTop: '15%',
    },
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
    },
  },
  catsgroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(10),
  },
  carded: {
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '0.15em 0.5em',
    borderRadius: theme.spacing(0.5),
  },
}));

const IndexPage = ({ data }) => {
  const classes = useStyles();

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const typographProps = {
    title: {
      variant: isSmallScreen ? 'h4' : 'h3',
    },
    subtitle: {
      variant: isSmallScreen ? 'h5' : 'h4',
    },
  };

  return (
    <WallpaperLayout>
      <Seo title={`Home`} />
      <Header />
      <Container component="main" maxWidth="sm" className={classes.container}>
        <Box color="text.primary" className={classes.catsgroup}>
          <CatsGroup />
          <Typography
            {...typographProps.title}
            className={classes.carded}
            gutterBottom
          >
            Gang of Four{' '}
            <span role="img" aria-label="Cat">
              🐈
            </span>
          </Typography>
          <Typography {...typographProps.subtitle} className={classes.carded}>
            - blog -
          </Typography>
        </Box>

        {data.allContentfulBlogPost.nodes.map((item, index) => (
          <BlogEntry key={index} entry={item} />
        ))}
      </Container>
    </WallpaperLayout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allContentfulBlogPost(sort: { fields: date, order: DESC }) {
      nodes {
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
              quality: 60
              width: 220
              height: 220
              formats: WEBP
              layout: FIXED
              placeholder: BLURRED
              outputPixelDensities: 1
            )
          }
          name
        }
      }
    }
  }
`;
