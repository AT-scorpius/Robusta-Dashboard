/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect, useLocation
} from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import NotFound from 'components/Page/NotFound';
import { getAuth } from './helpers/getAuth';
// Components
import Login from './components/Login/Login';
import Admin from './layouts/Admin';
import NotAuth from './components/Page/NotAuth';

const App = () => {
  let token = sessionStorage.getItem('__token__');
  useEffect(() => {
    getAuth();
    token = sessionStorage.getItem('__token__');
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={() => (token ? <Admin /> : <NotAuth />)} />
        <Route path="/login" render={() => <Login />} exact />
        <Route path="/404" render={() => <NotFound />} />
        <Route path="/" render={() => (token ? <Redirect to="/admin" /> : <Login />)} exact />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
