import React, { useEffect, useState } from "react";
import { DeviceService } from "services/devices.service";
import { DeviceHistory } from "./DeviceHistory";
import { TemperatureChart } from "./TemperatureChart";

export const History = ({ match }) => {
  const { id } = match.params;
  const [feed, setFeed] = useState("");
  useEffect(() => {
    DeviceService.getOne(id).then((device) => {
      const { feed } = device.data;
      setFeed(feed);
    });
  }, []);
  if (feed == "temperature") {
    return <TemperatureChart />;
  } else {
    return <DeviceHistory id={id} />;
  }
  //   return <TemperatureChart />;
};
