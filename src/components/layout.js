import * as React from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import { CssBaseline } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import Theme from '../theme';
import { ThemeProvider } from '@material-ui/core/styles';

const Layout = ({ children }) => {
  const { site } = useStaticQuery(query);

  const {
    title,
    titleTemplate,
    description,
    siteUrl,
    image,
  } = site.siteMetadata;

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Helmet title={title} titleTemplate={titleTemplate}>
        {/* common */}
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* open graph */}
        <meta property="og:url" content={siteUrl} />
        {/* <meta property="og:type" content="article" /> */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* links */}
        <link rel="canonical" href="http://fourgang.netlify.app" />
      </Helmet>
      {children}
    </ThemeProvider>
  );
};

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        titleTemplate
        description
        siteUrl
        image
      }
    }
  }
`;

export default Layout;
