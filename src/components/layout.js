import * as React from 'react';

import { CssBaseline } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import Theme from '../theme';
import { ThemeProvider } from '@material-ui/core/styles';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={Theme}>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
