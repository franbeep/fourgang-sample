import * as React from 'react';

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Paper,
  Toolbar,
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

import { ClickAwayListener } from '@material-ui/core';
import { Link } from 'gatsby';
import { Menu as MenuIcon } from '@material-ui/icons';
import Search from '../components/search';

const createUseStyles = colorSet => {
  return makeStyles(theme => ({
    root: {
      'boxShadow': 'none',
      '& a': {
        textDecoration: 'none',
      },
    },
    grow: {
      flexGrow: 1,
    },
    menuNavigation: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    menuHamburguerNavigation: {
      'position': 'relative',
      'alignSelf': 'flex-end',
      'right': 0,
      '& div': {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      },
    },
    menuButton: {
      background: 'rgba(255, 255, 255, 0.8)',
      marginRight: theme.spacing(1),
      marginLeft: '-6px',
      borderRadius: theme.spacing(0.5),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
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
    carded: {
      display: 'flex',
      flexDirection: 'row',
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '0.5em 1em',
      borderRadius: theme.spacing(0.5),
    },
    paperCarded: {
      background: 'rgba(255, 255, 255, 0.8)',
    },
  }));
};

const Header = ({ theme = 'light' }) => {
  const classes = createUseStyles(theme)();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const searchIndices = [{ name: `Pages`, title: `Pages` }];

  const links = [
    <Link to="/" key={0}>
      <Button>Home</Button>
    </Link>,

    <Link to="/about" key={1}>
      <Button>About</Button>
    </Link>,

    <a href="/rss.xml" target="_blank" rel="noopener nofollow" key={2}>
      <Button>RSS</Button>
    </a>,
  ];

  return (
    <AppBar position="fixed" color="transparent" className={classes.root}>
      <Toolbar component="nav">
        <ClickAwayListener
          // onClickAway={() => {
          //   setMenuOpen(false);
          // }}
          onClickAway={() => {
            setMenuOpen(false);
          }}
        >
          <>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              <MenuIcon />
            </IconButton>

            {menuOpen && (
              <Box component="div" className={classes.menuHamburguerNavigation}>
                <Paper elevation={0} className={classes.paperCarded}>
                  {links}
                </Paper>
              </Box>
            )}
          </>
        </ClickAwayListener>

        <div className={classes.grow}></div>

        <Box className={classes.carded}>
          <Box className={classes.menuNavigation}>{links}</Box>
          <Search indices={searchIndices} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
