import Signin from "pages/Signin";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Routes } from "routes";
import { DeviceCreate } from "./DeviceCreate";
import { DeviceHistory } from "./DeviceHistory";
import { Devices } from "./Devices";

export function DevicePage() {
  return (
    <Switch>
      <Route exact path={Routes.Devices.list} component={Devices} />
      <Route exact path={Routes.Devices.create} component={DeviceCreate} />
      <Route exact path={Routes.Devices.edit} component={DeviceCreate} />
      <Route exact path={Routes.Devices.history} component={DeviceHistory} />
    </Switch>
  );
}
