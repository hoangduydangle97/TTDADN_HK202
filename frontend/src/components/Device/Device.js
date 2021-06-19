import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faTemperatureLow,
  faLightbulb,
  faTint,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { useMqttState } from "mqtt-react-hooks";
import { getTopic } from "../../utils";
import { useFeedData } from "../../hooks/useFeedData";

import classes from "./Device.module.scss";
import Switch from "../UI/Switch/Switch";
import ModeControl from "./Controls/Mode/ModeControl";
import TemperatureControl from "./Controls/Temperature/TemperatureControl";
import { Link } from "react-router-dom";

import { Routes } from "routes";

export const CustomWidget = (props) => {
  const { icon, iconColor, title, onClick, value, sw, id } = props;
  console.log(title);
  return (
    <div className={classes.Header}>
      <div className={classes.Title}>
        <FontAwesomeIcon icon={icon} />
        {title}
      </div>
      {sw && (
        <div className={classes.Switch}>
          <Switch onChange={onClick} checked={value} />
        </div>
      )}
      <Link
        className={classes.Settings}
        to={Routes.Devices.history.replace(":id", id)}
      >
        <FontAwesomeIcon icon={faCog} />
      </Link>
    </div>
  );
};

export function TemperatureWidget({ feed, id }) {
  const status = useFeedData(feed);
  const controlProps = {
    controlId: feed,
    name: "Mode",
    //onUpdateValue: () => {},
    max: 100,
    min: 0,
    type: "temperature",
    unit: "c",
    value: status,
  };

  return (
    <div className={classes.Device}>
      <CustomWidget
        title="Temperature"
        icon={faTemperatureLow}
        sw={false}
        id={id}
      />
      <div className={classes.DeviceContainer}>
        <div className={classes.TemperatureControlContainer}>
          <div className={classes.Title} data-test="device-title">
            Mode
          </div>
          <TemperatureControl {...controlProps} />
        </div>
      </div>
    </div>
  );
}
export function GasWidget({ feed, id }) {
  const status = useFeedData(feed);

  const controlProps = {
    controlId: feed,
    name: "Mode",
    //onUpdateValue: () => {},
    options: {
      OFF: { name: "NORMAL", icon: "" },
      ON: { name: "DANGER", icon: "" },
    },
    type: "mode",
    value: status,
  };

  return (
    <div className={classes.Device}>
      <CustomWidget title="Gas" icon={faFire} sw={false} id={id} />

      <div className={classes.DeviceContainer}>
        <div className={classes.TemperatureControlContainer}>
          <div className={classes.Title} data-test="device-title">
            Mode
          </div>
          <ModeControl {...controlProps} />
        </div>
      </div>
    </div>
  );
}
export function LightWidget({ feed, id }) {
  const { client } = useMqttState();
  const status = useFeedData(feed);

  function handleClick() {
    return client.publish(getTopic(feed), status === "ON" ? "OFF" : "ON");
  }

  const controlProps = {
    controlId: feed,
    name: "Mode",
    //onUpdateValue: handleClick,
    options: {
      OFF: { name: "OFF", icon: "" },
      ON: { name: "ON", icon: "" },
    },
    type: "mode",
    value: status,
  };

  return (
    <div className={classes.Device}>
      <CustomWidget
        key={feed}
        onClick={handleClick}
        title="Light"
        icon={faLightbulb}
        sw={true}
        value={status === "ON" ? true : false}
        id={id}
      />

      <div className={classes.DeviceContainer}>
        <div className={classes.TemperatureControlContainer}>
          <div className={classes.Title} data-test="device-title">
            Mode
          </div>
          <ModeControl {...controlProps} />
        </div>
      </div>
    </div>
  );
}

export function WaterPumpWidget({ feed, id }) {
  const { client } = useMqttState();
  const status = useFeedData(feed);

  function handleClick() {
    return client.publish(getTopic(feed), status === "ON" ? "OFF" : "ON");
  }

  const controlProps = {
    controlId: feed,
    name: "Mode",
    //onUpdateValue: handleClick,
    options: {
      OFF: { name: "OFF", icon: "" },
      ON: { name: "ON", icon: "" },
    },
    type: "mode",
    value: status,
  };

  return (
    <div className={classes.Device}>
      <CustomWidget
        key={feed}
        onClick={handleClick}
        title="Water Pump"
        icon={faTint}
        sw={true}
        value={status === "ON" ? true : false}
        id={id}
      />
      <div className={classes.DeviceContainer}>
        <div className={classes.TemperatureControlContainer}>
          <div className={classes.Title} data-test="device-title">
            Mode
          </div>
          <ModeControl {...controlProps} />
        </div>
      </div>
    </div>
  );
}
