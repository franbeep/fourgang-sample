import * as React from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';

import { InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { connectSearchBox } from 'react-instantsearch-dom';

const useStyles = makeStyles(theme => ({
  search: {
    'position': 'relative',
    'borderRadius': theme.shape.borderRadius,
    'backgroundColor': fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    'marginLeft': 0,
    'width': '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      'width': '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus, children }) => {
    const classes = useStyles();

    return (
      <form className={className}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={e => refine(e.target.value)}
            value={currentRefinement}
            onFocus={onFocus}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        {children}
      </form>
    );
  }
);
