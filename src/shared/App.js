import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Home, Login } from './pages';
import './styles/main.scss';

const Index = () => (
  <Fragment>
    <Route path="/" exact component={Home} />
    <Route path="/login" component={Login} />
  </Fragment>
);

export default Index;
