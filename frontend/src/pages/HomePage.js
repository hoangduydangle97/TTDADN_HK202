import Navbar from 'components/Navbar';
import Preloader from 'components/Preloader';
import Sidebar from 'components/Sidebar';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from 'routes';
import { Dashboard } from './Dashboard';
import { DevicePage } from './devices';
import { ExamplePage } from './examples';
import { RoomPage } from './rooms';
import { RuleCreate } from './rules/RuleCreate';
import { Rules } from './rules/Rules';
import Settings from './Settings';
import Signin from './Signin';
import Signup from './Signup';

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

    <RouteWithSidebar path={Routes.Devices.prefix} component={DevicePage} />
    <RouteWithSidebar path={Routes.Rooms.prefix} component={RoomPage} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />

    <RouteWithSidebar exact path={Routes.Rules.list} component={Rules} />
    <RouteWithSidebar exact path={Routes.Rules.create} component={RuleCreate} />
    <RouteWithSidebar exact path={Routes.Rules.edit} component={RuleCreate} />

    <RouteWithLoader path={Routes.Examples.prefix} component={ExamplePage} />
    <RouteWithSidebar
      exact
      path={Routes.Dashboard.path}
      component={Dashboard}
    />
    <Redirect to={Routes.Dashboard.path} />
  </Switch>
);
