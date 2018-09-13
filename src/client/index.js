import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router, routerMiddleware } from 'react-router-redux';
import App from '../shared/App';
import IntlProvider from '../shared/i18n/IntlProvider';
import { configureStore } from '../shared/store';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App />;
  }
}
const theme = createMuiTheme({});

const browserHistory = window.browserHistory || createHistory();
const store =
  window.store ||
  configureStore({
    initialState: window.__PRELOADED_STATE__,
    middleware: [routerMiddleware(browserHistory)]
  });

hydrate(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <IntlProvider>
          <Main />
        </IntlProvider>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }

  if (!window.store || !window.browserHistory) {
    window.browserHistory = browserHistory;
    window.store = store;
  }
}
