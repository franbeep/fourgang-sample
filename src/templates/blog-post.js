import * as React from 'react';

import {
  Avatar,
  Box,
  Container,
  Divider,
  Link,
  Paper,
  Typography,
} from '@material-ui/core';

import { AvatarGroup } from '@material-ui/lab';
import { BLOCKS } from '@contentful/rich-text-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import Header from '../components/header';
import Layout from '../components/layout';
import WallpaperLayout from '../components/wallpaper-layout';
import RichTextImage from '../components/richTextImage';
import Seo from '../components/seo';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { parseRichTextToTexts } from '../utils/richTextUtils';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

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
  padding: {
    padding: theme.spacing(3),
  },
  authorDate: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    paddingLeft: theme.spacing(0.6),
    opacity: 0.75,
  },
  avatarGroup: {
    '& .MuiAvatar-root': {
      borderColor: 'white',
    },
  },
  avatarImg: {
    '& div': {
      width: 'inherit !important',
      height: 'inherit !important',
    },
  },
  carded: {
    display: 'inline-flex',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '0.15em 0.5em',
    borderRadius: theme.spacing(0.5),
  },
}));

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return <RichTextImage assetId={node.data.target.sys.id} />;
    },
  },
};

const Separator = () => (
  <Box component="span" style={{ padding: '0 0.4em' }}>
    •
  </Box>
);

const BlogPost = ({ pageContext: entry }) => {
  const classes = useStyles();

  const simpleText = parseRichTextToTexts(JSON.parse(entry.text.raw));

  return (
    <WallpaperLayout
      dynamic
      dynamicData={entry.background.gatsbyImageData}
      maxHeight="75vh"
    >
      <Seo
        title={entry.title}
        desc={simpleText[0]}
        externalBanner={`https:${entry.authors[0].avatar.fixed.src}`}
        pathname={`/${entry.slug}`}
        article
        node={entry}
      />
      <Header />
      <Container
        component="article"
        maxWidth="md"
        className={classes.container}
      >
        <Typography variant="h3" className={classes.carded} gutterBottom>
          {entry.title}
        </Typography>

        <Paper elevation={0} className={classes.padding}>
          <div className={classes.authorDate}>
            <AvatarGroup max={3} className={classes.avatarGroup}>
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

            <Typography variant="subtitle1" className={classes.subtitle}>
              {entry.authors
                // .slice(0, 2)
                .reduce((acc, author) => {
                  return acc.length === 0
                    ? [author]
                    : acc.concat(null).concat(author);
                }, [])
                .map((author, index) => {
                  if (author == null) return ', ';
                  return (
                    <Link key={index} href="#">
                      {author.name}
                    </Link>
                  );
                })}
              <Separator />
              {moment(entry.createdAt).format('ll')}
              <Separator />
              {moment(entry.createdAt).fromNow()}
            </Typography>
          </div>

          <Divider />

          <Typography component="div" variant="subtitle1" paragraph>
            {renderRichText(entry.text, options)}
          </Typography>

          <Divider />

          <Typography
            component="div"
            variant="body1"
            className={classes.subtitle}
            paragraph
          >
            Posted on {moment(entry.createdAt).format('LLLL')}
          </Typography>
        </Paper>
      </Container>
    </WallpaperLayout>
  );
};

export default BlogPost;
