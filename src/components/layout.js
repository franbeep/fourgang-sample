import * as React from 'react';

import { CssBaseline } from '@material-ui/core';
import Theme from '../theme';
import { ThemeProvider } from '@material-ui/core/styles';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
