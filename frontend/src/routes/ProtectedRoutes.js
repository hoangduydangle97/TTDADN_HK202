import Navbar from "components/Navbar";
import Preloader from "components/Preloader";
import Sidebar from "components/Sidebar";
import useToken from "hooks/useToken";
import { Dashboard } from "pages/Dashboard";
import { DevicePage } from "pages/devices";
import { ExamplePage } from "pages/examples";
import { RoomPage } from "pages/rooms";
import { RuleCreate } from "pages/rules/RuleCreate";
import { Rules } from "pages/rules/Rules";
import Settings from "pages/Settings";
import Signin from "pages/Signin";
import Signup from "pages/Signup";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Routes } from "../routes";

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
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};
const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [token] = useToken();

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

          {token ? (
            <main className="content">
              <Navbar />
              <Component {...props} />
            </main>
          ) : (
            <Redirect to={Routes.Signin.path}/>
          )}
        </>
      )}
    />
  );
};

export function ProtectedRoutes() {
  return (
    <Switch>
      <RouteWithSidebar path={Routes.Devices.prefix} component={DevicePage} />
      <RouteWithSidebar path={Routes.Rooms.prefix} component={RoomPage} />
      <RouteWithSidebar
        exact
        path={Routes.Settings.path}
        component={Settings}
      />

      <RouteWithSidebar exact path={Routes.Rules.list} component={Rules} />
      <RouteWithSidebar
        exact
        path={Routes.Rules.create}
        component={RuleCreate}
      />
      <RouteWithSidebar exact path={Routes.Rules.edit} component={RuleCreate} />

      <RouteWithLoader path={Routes.Examples.prefix} component={ExamplePage} />
      <RouteWithSidebar
        exact
        path={Routes.Dashboard.path}
        component={Dashboard}
      />
      <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
      <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
      <Redirect to={Routes.Dashboard.path} />
    </Switch>
  );
}
