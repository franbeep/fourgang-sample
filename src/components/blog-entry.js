import * as React from 'react';

import {
  Avatar,
  Box,
  Button,
  Link,
  Paper,
  Typography,
} from '@material-ui/core';

import { AvatarGroup } from '@material-ui/lab';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link as GatsbyLink } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

const useStyles = makeStyles(theme => ({
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
  padLeft: {
    paddingLeft: theme.spacing(0.5),
  },
  title: {
    textDecoration: 'none',
  },
  avatarImg: {
    '& div': {
      width: 'inherit !important',
      height: 'inherit !important',
    },
  },
  authorsField: {
    color: 'rgba(0, 36, 33, 0.75)',
    paddingLeft: theme.spacing(0.6),
  },
}));

const Separator = () => (
  <Box component="span" style={{ padding: '0 0.4em' }}>
    •
  </Box>
);

const BlogEntry = ({ entry }) => {
  const classes = useStyles();

  return (
    <article className={classes.margin}>
      <Paper elevation={0} className={classes.padding}>
        <GatsbyLink to={`/${entry.slug}`} className={classes.title}>
          <Box color="text.primary">
            <Typography variant="h5" gutterBottom>
              {entry.title}
            </Typography>
          </Box>
        </GatsbyLink>

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

          <Typography variant="subtitle2" className={classes.authorsField}>
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
            <Separator />
            {moment(entry.createdAt).format('ll')}
            <Separator />
            {moment(entry.createdAt).fromNow()}
          </Typography>
        </div>

        <Typography component="div" variant="body1" paragraph>
          {renderRichText(entry.text)[0]}
        </Typography>

        <GatsbyLink to={`/${entry.slug}`}>
          <Button>Read More</Button>
        </GatsbyLink>
      </Paper>
    </article>
  );
};

export default BlogEntry;
