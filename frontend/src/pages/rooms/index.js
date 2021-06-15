import { DeviceCreate } from "pages/devices/DeviceCreate";
import { DevicesInRoom } from "pages/devices/DevicesInRoom";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Routes } from "routes";
import { RoomCreate } from "./RoomCreate";
import { Rooms } from "./Rooms";

export function RoomPage() {
  return (
    <Switch>
      <Route exact path={Routes.Rooms.list} component={Rooms} />
      <Route exact path={Routes.Rooms.devices} component={DevicesInRoom} />
      <Route exact path={Routes.Rooms.create} component={RoomCreate} />
      <Route exact path={Routes.Devices.edit} component={DeviceCreate} />
    </Switch>
  );
}
