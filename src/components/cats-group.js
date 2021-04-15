import * as React from 'react';
import * as style from './cats-group.module.scss';

import { Box } from '@material-ui/core';
import { StaticImage } from 'gatsby-plugin-image';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  above: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    'width': '100px',
    'height': '100px',
    '& div': {
      width: '100px !important',
      height: '100px !important',
    },
    [theme.breakpoints.up('sm')]: {
      'width': '100px',
      'height': '100px',
      '& div': {
        width: '100px !important',
        height: '100px !important',
      },
    },
    [theme.breakpoints.up('md')]: {
      'width': '160px',
      'height': '160px',
      '& div': {
        width: '160px !important',
        height: '160px !important',
      },
    },
    [theme.breakpoints.up('lg')]: {
      'width': '220px',
      'height': '220px',
      '& div': {
        width: '220px !important',
        height: '220px !important',
      },
    },
  },
}));

/*



*/

const CatsGroup = () => {
  const classes = useStyles();

  return (
    <Box className={classes.above}>
      <Box className={classes.wrapper + ' ' + style.wrapper}>
        <StaticImage
          src="../images/Stubbs.jpg"
          alt="Stubbs Avatar"
          placeholder="blurred"
          layout="fixed"
          width={220}
          height={220}
          quality={100}
        />
        <StaticImage
          src="../images/Duke.jpg"
          alt="Duke Avatar"
          placeholder="blurred"
          layout="fixed"
          width={220}
          height={220}
          quality={100}
        />
        <StaticImage
          src="../images/Henson.jpg"
          alt="Henson Avatar"
          placeholder="blurred"
          layout="fixed"
          width={220}
          height={220}
          quality={100}
        />
        <StaticImage
          src="../images/Effie.jpg"
          alt="Effie Avatar"
          placeholder="blurred"
          layout="fixed"
          width={220}
          height={220}
          quality={100}
        />
      </Box>
    </Box>
  );
};

export default CatsGroup;
