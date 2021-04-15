import * as React from 'react';
import * as style from './header.module.scss';

import { AppBar, Button, Toolbar } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

import { Link } from 'gatsby';
import Search from '../components/search';

const createUseStyles = colorSet => {
  return makeStyles(theme => ({
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
    appBar: {
      // color: colorSet === 'light' ? '#002421' : 'rgba(255,255,255, .8)',
      boxShadow: 'none',
    },
  }));
};

const Header = ({ theme = 'light' }) => {
  const classes = createUseStyles(theme)();

  const searchIndices = [{ name: `Pages`, title: `Pages` }];

  return (
    <AppBar position="fixed" color="transparent" className={classes.appBar}>
      <Toolbar>
        {/* <Typography variant="h6">cool logo here</Typography> */}

        <div className={classes.grow}></div>
        <nav>
          <Link to="/">
            <Button color="inherit" className={style.link}>
              Home
            </Button>
          </Link>

          <Link to="/about">
            <Button color="inherit" className={style.link}>
              About
            </Button>
          </Link>

          <Link to="/rss.xml">
            <Button color="inherit" className={style.link}>
              RSS
            </Button>
          </Link>
        </nav>

        <Search indices={searchIndices} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
