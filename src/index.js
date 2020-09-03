import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Scss/style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#446DFF",
      dark: "#4060F0",
      contrastText: "#5f6368",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme} >
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
