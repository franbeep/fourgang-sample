import * as React from 'react';

import { AppBar, Button, Toolbar } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

import { Link } from 'gatsby';
import Search from '../components/search';

const createUseStyles = colorSet => {
  return makeStyles(theme => ({
    root: {
      boxShadow: 'none',
    },
    grow: {
      flexGrow: 1,
    },
    search: {
      'position': 'relative',
      'borderRadius': theme.shape.borderRadius,
      'backgroundColor': fade(
        colorSet === 'light'
          ? theme.palette.common.black
          : theme.palette.common.white,
        0.15
      ),
      '&:hover': {
        backgroundColor: fade(
          colorSet === 'light'
            ? theme.palette.common.black
            : theme.palette.common.white,
          0.25
        ),
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
};

const Header = ({ theme = 'light' }) => {
  const classes = createUseStyles(theme)();

  const searchIndices = [{ name: `Pages`, title: `Pages` }];

  return (
    <AppBar position="fixed" color="transparent" className={classes.root}>
      <Toolbar>
        <div className={classes.grow}></div>
        <nav>
          <Link to="/">
            <Button>Home</Button>
          </Link>

          <Link to="/about">
            <Button>About</Button>
          </Link>

          <Link to="/rss.xml">
            <Button>RSS</Button>
          </Link>
        </nav>

        <Search indices={searchIndices} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
