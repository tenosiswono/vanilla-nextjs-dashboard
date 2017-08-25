import React, { Component } from 'react';
import { JssProvider } from 'react-jss';
import { withStyles, createStyleSheet, MuiThemeProvider } from 'material-ui/styles';
import { getContext } from '../styles/context';
import { initGA, logPageView } from '../utils/analytics';

// Apply some reset
const styleSheet = createStyleSheet((theme) => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
    },
    a: {
      textDecoration: 'none',
    },
    footer: {
      position: 'relative',
      right: 0,
      bottom: 0,
      left: 0,
      padding: '1rem',
      backgroundColor: '#e2e0e0',
      textAlign: 'center',
      color: '#333',
      fontFamily: 'Nunito,sans-serif',
      fontSize: 14,
    },
  },
}));

let AppWrapper = (props) => props.children;

AppWrapper = withStyles(styleSheet)(AppWrapper);

function layout(BaseComponent) {
  class Layout extends Component {
    static getInitialProps(context) {
      // If the page has a prop fetcher invoke it
      return BaseComponent.getInitialProps ? BaseComponent.getInitialProps(context) : {};
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
      /* eslint-disable no-console */
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => {
          console.log('service worker registration successful');
        })
        .catch((err) => {
          console.warn('service worker registration failed', err.message);
        });
      }
      // Google analytics
      if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
      }
      logPageView();
    }
    /* eslint-enable */
    render() {
      const context = getContext();

      return (
        <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
          <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
            <AppWrapper>
              <BaseComponent {...this.props} />
            </AppWrapper>
          </MuiThemeProvider>
        </JssProvider>
      );
    }
  }

  Layout.displayName = `layout(${BaseComponent.displayName})`;

  return Layout;
}

export default layout;
