import {
  Highlight,
  Hits,
  Index,
  PoweredBy,
  Snippet,
  connectStateResults,
} from 'react-instantsearch-dom';
import { Paper, Typography } from '@material-ui/core';

import { Link } from 'gatsby';
import { default as React } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;
  return hitCount > 0 ? (
    <Typography variant="body1">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </Typography>
  ) : null;
});

const useStyles = makeStyles(theme => ({
  result: {
    position: 'absolute',
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    width: '300px',
    top: '20px',
    left: '-300px',
  },
  poweredBy: {
    'fontSize': theme.typography.body2.fontSize,
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    '& svg': {
      width: '4.5em',
      // height: '3em',
    },
    '& span': {
      marginRight: theme.spacing(1),
    },
  },
  highlight: {
    '& mark': {
      padding: theme.spacing(0.3),
      backgroundColor: yellow[200],
      borderRadius: theme.spacing(0.5),
    },
  },
}));

const PageHit = ({ hit }) => {
  const classes = useStyles();

  return (
    <div>
      <Link to={`/${hit.slug}`}>
        <Typography variant="subtitle1">
          <Highlight
            attribute="title"
            hit={hit}
            tagName="mark"
            className={classes.highlight}
          />
        </Typography>
      </Link>
      {/* <Snippet attribute="slug" hit={hit} tagName="mark" /> */}
    </div>
  );
};

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
);

const SearchResult = ({ indices, className }) => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={className + ' ' + classes.result}>
      {indices.map(index => (
        <HitsInIndex key={index.name} index={index} />
      ))}
      <PoweredBy className={classes.poweredBy} />
    </Paper>
  );
};

export default SearchResult;
