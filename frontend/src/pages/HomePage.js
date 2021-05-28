import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from '../routes';

// pages
import Settings from './Settings';
import Signin from './Signin';
import Signup from './Signup';
import ForgotPassword from './examples/ForgotPassword';
import ResetPassword from './examples/ResetPassword';
import Lock from './examples/Lock';
import NotFoundPage from './examples/NotFound';
import ServerError from './examples/ServerError';

// components
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Preloader from '../components/Preloader';

import { Devices } from './devices/Devices';
import { DeviceCreate } from './devices/DeviceCreate';
import { Dashboard } from './Dashboard';

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {' '}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{' '}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} />
          </main>
        </>
      )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithSidebar exact path={Routes.Devices.list} component={Devices} />
    <RouteWithSidebar
      exact
      path={Routes.Devices.create}
      component={DeviceCreate}
    />
    <RouteWithSidebar
      exact
      path={Routes.Devices.edit}
      component={DeviceCreate}
    />
    <RouteWithSidebar
      exact
      path={Routes.Dashboard.path}
      component={Dashboard}
    />

    <RouteWithLoader
      exact
      path={Routes.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.ResetPassword.path}
      component={ResetPassword}
    />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
