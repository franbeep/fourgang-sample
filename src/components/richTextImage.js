import * as React from 'react';

import { Box, Typography } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';

import { GatsbyImage } from 'gatsby-plugin-image';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  centered: {
    'display': 'flex',
    'flexDirection': 'column',
    '& img': {
      objectFit: 'contain !important',
    },
  },
}));

const RichTextImage = ({ className, assetId }) => {
  const classes = useStyles();

  const data = useStaticQuery(graphql`
    {
      allContentfulAsset {
        edges {
          node {
            contentful_id
            gatsbyImageData(
              quality: 100
              width: 220
              height: 220
              formats: WEBP
              layout: FIXED
              placeholder: BLURRED
            )
            description
          }
        }
      }
    }
  `);

  const asset = data.allContentfulAsset.edges.find(
    item => item.node.contentful_id == assetId
  );

  if (!asset) return null;

  return (
    <Box className={classes.centered}>
      <GatsbyImage
        className={className}
        image={asset.node.gatsbyImageData}
        src=""
        alt=""
      />
      {asset.node.description && (
        <Typography align="center" variant="caption">
          {asset.node.description}
        </Typography>
      )}
    </Box>
  );
};

export default RichTextImage;
