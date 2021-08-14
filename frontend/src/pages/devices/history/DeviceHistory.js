import React, { useState } from "react";
import { AdafruitService } from "services/adafruit.service";
import { DeviceService } from "services/devices.service";
import classes from "../../../components/Device/Device.module.scss";

export const DeviceHistory = ({ id }) => {
  const [listData, setListData] = useState([]);
  const [deviceName, setDeviceName] = useState("");

  React.useEffect(() => {
    DeviceService.getOne(id).then((device) => {
      console.log(device);
      setDeviceName(device.data.name);
      const feed = device.data.feed;
      AdafruitService.getFeedData(feed, true).then((res) => {
        setListData(res.data);
      });
    });
  }, [id]);

  const renderHistory = listData.map((item) => {
    const created_at = new Date(item.created_at).toLocaleString();
    return (
      <li key={item.id}>
        <div>
          <span>{created_at}</span>
          <h5>Value: {item.value}</h5>
        </div>
      </li>
    );
  });

  return (
    <div className={classes.ContentBox}>
      <div className={classes.ContentTitle}>
        <h2>Timeline</h2>
        <div>Device: {deviceName}</div>
      </div>
      <div className={classes.TimelineContent}>
        <ul>{renderHistory}</ul>
      </div>
    </div>
  );
};
