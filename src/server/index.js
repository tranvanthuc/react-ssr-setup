// import React from 'react';
import express from 'express';
import cors from 'cors';
import path from 'path';
import chalk from 'chalk';
import manifestHelpers from 'express-manifest-helpers';
import bodyParser from 'body-parser';
import { configureStore } from '../shared/store';
import serverRender from './render';
import paths from '../../config/paths';
// const upload = require('./upload');

require('dotenv').config();

const app = express();

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
if (process.env.NODE_ENV === 'development') {
  app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)));
  app.use('/favicon.ico', (req, res) => {
    res.send('favicon');
  });
}

app.use(cors());

// xu ly json, text va ma hoa URL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// add store into req
app.use((req, res, next) => {
  req.store = configureStore();
  return next();
});

const manifestPath = path.join(paths.clientBuild, paths.publicPath);

app.use(
  manifestHelpers({
    manifestPath: `${manifestPath}/manifest.json`
  })
);

app.use(serverRender());

// api
require('./routes')(app);

app.get('/api/test', (req, res) => {
  res.send('hello');
});

// app.post('/api/upload', (req, res) => {
//   upload.single('photo')(req, res, err => {
//     if (err) {
//       res.send(err.message);
//     }
//     res.send('Uploaded');
//   });
// });

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  return res.status(404).json({
    status: 'error',
    message: err.message,
    stack:
      // print a nicer stack trace by splitting line breaks and making them array items
      process.env.NODE_ENV === 'development' &&
      (err.stack || '')
        .split('\n')
        .map(line => line.trim())
        .map(line => line.split(path.sep).join('/'))
        .map(line =>
          line.replace(
            process
              .cwd()
              .split(path.sep)
              .join('/'),
            '.'
          )
        )
  });
});

app.listen(process.env.PORT || 8500, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(`App is running: 🌎 http://localhost:${process.env.PORT || 8500}`)
  );
});

// Configuring the database
const config = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(
    config.database,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
  });
mongoose.set('useCreateIndex', true);

export default app;

export const test = 'FOO';
