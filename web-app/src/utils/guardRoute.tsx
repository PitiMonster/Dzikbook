import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const GuardedRoute: React.FC<{
  Component: React.FC<{}>;
  isPermitted: boolean;
  path: string;
  exact: boolean;
}> = ({ Component, isPermitted, path, exact = false }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) => (isPermitted ? <Component /> : <Redirect to="/" />)}
  />
);

export default GuardedRoute;
