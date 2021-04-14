import * as React from 'react';
import * as style from './blog-post.module.scss';

import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Paper,
  Typography,
} from '@material-ui/core';
import { GatsbyImage, getImageData } from 'gatsby-plugin-image';

import { AvatarGroup } from '@material-ui/lab';
import { Link as GatsbyLink } from 'gatsby';
import Header from '../components/header';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import { makeStyles } from '@material-ui/core/styles';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  container: {
    paddingTop: '15%',
  },
  padding: {
    padding: theme.spacing(2),
  },
  margin: {
    marginBottom: theme.spacing(5),
  },
  authorDate: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  padLeft: {
    paddingLeft: theme.spacing(0.5),
  },
  underline: {
    textDecoration: 'underline',
  },
  avatarImg: {
    '& div': {
      width: 'inherit !important',
      height: 'inherit !important',
    },
  },
}));

const BlogPost = ({ pageContext: entry }) => {
  const classes = useStyles();

  // const siteUrl = 'https://fourgang.netlify.app';
  // console.log(getImageData(entry.authors[0].avatar.gatsbyImageData));

  return (
    <Layout>
      <Header />
      <Helmet title={entry.title}>
        <meta property="og:title" content={entry.title} />
        <meta name="image" content={entry.authors[0].avatar.fixed.src} />
        <meta property="og:image" content={entry.authors[0].avatar.fixed.src} />
        {/* <meta property="og:url" content={siteUrl + '/' + entry.slug} /> */}
        <meta property="og:type" content="article" />
        <meta charSet="utf-8" />
      </Helmet>

      <Container component="main" maxWidth="sm" className={classes.container}>
        <Paper elevation={0} className={classes.padding}>
          <Typography variant="h3" gutterBottom>
            {entry.title}
          </Typography>
          <div className={classes.authorDate}>
            <AvatarGroup max={2}>
              {entry.authors.map((author, authorIndex) => (
                <Avatar key={authorIndex} className={classes.avatarImg}>
                  <GatsbyImage
                    image={author.avatar.gatsbyImageData}
                    src="" // marked as required, but useless
                    alt={`${author.name} avatar`}
                  />
                </Avatar>
              ))}
            </AvatarGroup>
            <Typography
              color="secondary"
              variant="h6"
              className={classes.padLeft}
            >
              {entry.authors
                .reduce((acc, author) => {
                  return acc.length === 0
                    ? [author]
                    : acc.concat(null).concat(author);
                }, [])
                .map((author, index) => {
                  if (author == null) return ', ';
                  return (
                    <Link key={index} color="secondary" href="#">
                      {author.name}
                    </Link>
                  );
                })}
            </Typography>
            <Typography variant="h6" className={classes.padLeft}>
              •
            </Typography>
            <Typography variant="h6" className={classes.padLeft}>
              {entry.date}
            </Typography>
          </div>

          <Box>
            <Typography component="div" variant="subtitle1" paragraph>
              {renderRichText(entry.text)}
            </Typography>
          </Box>

          <GatsbyLink to="/" classes={style.link}>
            <Button>Go Back</Button>
          </GatsbyLink>
        </Paper>
      </Container>
    </Layout>
  );
};

export default BlogPost;
