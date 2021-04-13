import * as React from 'react';
import * as style from './blog-entry.module.scss';

import { Avatar, Button, Link, Paper, Typography } from '@material-ui/core';

import { AvatarGroup } from '@material-ui/lab';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link as GatsbyLink } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

const useStyles = makeStyles(theme => ({
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

// function truncate(text, maxLength = 30) {
//   const words = text.trim().split(' ');
//   if (words.length > maxLength)
//     return words.slice(0, maxLength).join(' ') + ' ...';
//   return text;
// }

const BlogEntry = ({ entry }) => {
  const classes = useStyles();

  return (
    <article className={classes.margin}>
      <Paper elevation={0} className={classes.padding}>
        <Typography variant="h5" gutterBottom>
          {entry.title}
        </Typography>

        <div className={classes.authorDate}>
          {/* error src ? */}

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
            variant="subtitle1"
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
          <Typography variant="subtitle1" className={classes.padLeft}>
            •
          </Typography>
          <Typography variant="subtitle1" className={classes.padLeft}>
            {entry.date}
          </Typography>
        </div>

        <Typography component="div" variant="body1" paragraph>
          {renderRichText(entry.text)[0]}
        </Typography>

        <GatsbyLink to={`/${entry.slug}`} classes={style.link}>
          <Button>Read More</Button>
        </GatsbyLink>
      </Paper>
    </article>
  );
};

export default BlogEntry;
