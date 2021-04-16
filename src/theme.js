import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#002421',
    },
    background: {
      default: '#ebebeb',
    },
  },
  typography: {
    fontFamily: '-apple-system, Ubuntu, Roboto, Helvetica, Arial, sans-serif',
  },
});

export default theme;
