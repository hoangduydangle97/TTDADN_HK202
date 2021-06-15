import { Col, Row } from '@themesberg/react-bootstrap';
import {
  GasWidget,
  LightWidget,
  TemperatureWidget,
  WaterPumpWidget,
} from 'components/Device/Device';
import { DEVICE_TYPE } from 'const';
import React from 'react';
import { RoomService } from 'services/rooms.service';
import classes from "./RoomDevices.module.scss";

export function DevicesInRoom({ match }) {
  const { id } = match.params;
  let [devices, setDevices] = React.useState([]);

  React.useEffect(() => {
    RoomService.getAllDevicesInRoom(id).then((res) => {
      setDevices(res.data);
    });
  }, [id]);

  return (
    <div className={classes.RoomDevices}>
      {!devices || (!devices.length && 'This room has no devices.')}
      {devices &&
        devices.map((device) => {
          //console.log('DEVICE', device);
          switch (Number.parseInt(device.type)) {
            case DEVICE_TYPE.TEMPERATURE_SENSOR:
              //console.log('TEMPERATURE_SENSOR', device);
              return (
                <div key={device.id} className={classes.Column}>
                  <TemperatureWidget feed={device.feed} />
                </div>
              );
            case DEVICE_TYPE.GAS_SENSOR:
              //console.log('TEMPERATURE_SENSOR', device);
              return (
                <div key={device.id} className={classes.Column}>
                  <GasWidget feed={device.feed} />
                </div>
              );
            case DEVICE_TYPE.LIGHT:
              //console.log('TEMPERATURE_SENSOR', device);
              return (
                <div key={device.id} className={classes.Column}>
                  <LightWidget feed={device.feed} />
                </div>
              );
            case DEVICE_TYPE.WATER_PUMP:
              //console.log('TEMPERATURE_SENSOR', device);
              return (
                <div key={device.id} className={classes.Column}>
                  <WaterPumpWidget feed={device.feed} />
                </div>
              );

            default:
              break;
          }
        })}
    </div>
  );
}
