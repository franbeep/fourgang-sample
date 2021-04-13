import * as React from 'react';
import * as style from './cats-group.module.scss';

import { Box } from '@material-ui/core';
import { StaticImage } from 'gatsby-plugin-image';

const CatsGroup = () => {
  return (
    <Box className={style.wrapper}>
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
  );
};

export default CatsGroup;
