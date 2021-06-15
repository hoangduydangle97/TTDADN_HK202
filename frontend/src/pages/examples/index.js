import React from "react";
import { Route, Switch } from "react-router-dom";
import { Routes } from "routes";
import ForgotPassword from "./ForgotPassword";
import Lock from "./Lock";
import ResetPassword from "./ResetPassword";
import ServerError from "./ServerError";
import NotFoundPage from "./NotFound";

export function ExamplePage() {
  return (
    <Switch>
      <Route
        exact
        path={Routes.ForgotPassword.path}
        component={ForgotPassword}
      />
      <Route
        exact
        path={Routes.Examples.ResetPassword}
        component={ResetPassword}
      />
      <Route exact path={Routes.Examples.Lock} component={Lock} />
      <Route exact path={Routes.Examples.NotFound} component={NotFoundPage} />
      <Route exact path={Routes.Examples.ServerError} component={ServerError} />
    </Switch>
  );
}
