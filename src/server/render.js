import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import IntlProvider from '../shared/i18n/IntlProvider';
import Html from './components/HTML';
import App from '../shared/App';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from '@material-ui/core/styles';

const serverRenderer = () => (req, res, next) => {
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a theme instance.
  const theme = createMuiTheme({});

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();
  if (!req.originalUrl.includes('/api')) {
    const content = renderToString(
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <Provider store={req.store}>
            <Router location={req.url} context={{}}>
              <IntlProvider>
                <App />
              </IntlProvider>
            </Router>
          </Provider>
        </MuiThemeProvider>
      </JssProvider>
    );

    const state = JSON.stringify(req.store.getState());
    const style = sheetsRegistry.toString();

    return res.send(
      '<!doctype html>' +
        renderToString(
          <Html
            css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
            scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
            state={state}
            style={style}
          >
            {content}
          </Html>
        )
    );
  }
  next();
};

export default serverRenderer;
