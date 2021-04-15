import * as React from 'react';
import * as style from './blog-post.module.scss';

import {
  Avatar,
  Box,
  Container,
  Divider,
  Link,
  Paper,
  Typography,
} from '@material-ui/core';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

import { AvatarGroup } from '@material-ui/lab';
import { GatsbyImage } from 'gatsby-plugin-image';
import Header from '../components/header';
import Layout from '../components/layout';
import RichTextImage from '../components/richTextImage';
import Seo from '../components/seo';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { parseRichTextToTexts } from '../utils/richTextUtils';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  container: {
    'paddingTop': '15%',
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
    },
  },
  padding: {
    padding: theme.spacing(3),
  },
  margin: {
    marginBottom: theme.spacing(5),
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

const options = {
  // renderMark: {
  //   [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  // },
  renderNode: {
    // [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
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

  console.log('ENTRY');
  console.log(entry);

  return (
    <Layout>
      <Seo
        title={entry.title}
        desc={simpleText[0]}
        externalBanner={`https:${entry.authors[0].avatar.fixed.src}`}
        pathname={`/${entry.slug}`}
        article={entry.createdAt}
        node={entry}
      />
      <Header />
      <Container
        component="article"
        maxWidth="md"
        className={classes.container}
      >
        <Typography variant="h3" gutterBottom>
          {entry.title}
        </Typography>

        <Paper elevation={0} className={classes.padding}>
          <div className={classes.authorDate}>
            <AvatarGroup max={3}>
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
                    <Link key={index} color="secondary" href="#">
                      {author.name}
                    </Link>
                  );
                })}
              {/* {entry.authors.length > 2 && ' & more'} */}
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
    </Layout>
  );
};

export default BlogPost;
