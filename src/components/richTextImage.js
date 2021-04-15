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
            gatsbyImageData
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
  // return (
  //   <>
  //     <h2>Embedded Asset (Fetched and Filtered)</h2>
  //     <pre>
  //       <code>Asset not found.</code>
  //     </pre>
  //   </>
  // );

  // return (
  //   <>
  //     <h2>Embedded Asset (Fetched and Filtered)</h2>
  //     <pre>
  //       <code>{JSON.stringify(asset, null, 2)}</code>
  //     </pre>
  //   </>
  // );

  return (
    <Box className={classes.centered}>
      {/* <>
        <h2>Embedded Asset (Fetched and Filtered)</h2>
        <pre>
          <code>{JSON.stringify(asset, null, 2)}</code>
        </pre>
      </> */}
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
