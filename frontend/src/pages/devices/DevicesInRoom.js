import { Col, Row } from '@themesberg/react-bootstrap';
import {
  GasWidget,
  LightWidget,
  TemperatureWidget,
  WaterPumpWidget,
} from 'components/TemperatureWidget';
import { DEVICE_TYPE } from 'const';
import React from 'react';
import { RoomService } from 'services/rooms.service';

export function DevicesInRoom({ match }) {
  const { id } = match.params;
  let [devices, setDevices] = React.useState([]);

  React.useEffect(() => {
    RoomService.getAllDevicesInRoom(id).then((res) => {
      setDevices(res.data);
    });
  }, [id]);

  return (
    <Row className="justify-content-md-center">
      {!devices || (!devices.length && 'This room has no devices.')}
      {devices &&
        devices.map((device) => {
          console.log('DEVICE', device);
          switch (Number.parseInt(device.type)) {
            case DEVICE_TYPE.TEMPERATURE_SENSOR:
              console.log('TEMPERATURE_SENSOR', device);
              return (
                <Col key={device.id} xs={6} className="mb-4">
                  <TemperatureWidget feed={device.feed} />
                </Col>
              );
            case DEVICE_TYPE.GAS_SENSOR:
              console.log('TEMPERATURE_SENSOR', device);
              return (
                <Col key={device.id} xs={6} className="mb-4">
                  <GasWidget feed={device.feed} />
                </Col>
              );
            case DEVICE_TYPE.LIGHT:
              console.log('TEMPERATURE_SENSOR', device);
              return (
                <Col key={device.id} xs={6} className="mb-4">
                  <LightWidget feed={device.feed} />
                </Col>
              );
            case DEVICE_TYPE.WATER_PUMP:
              console.log('TEMPERATURE_SENSOR', device);
              return (
                <Col key={device.id} xs={6} className="mb-4">
                  <WaterPumpWidget feed={device.feed} />
                </Col>
              );

            default:
              break;
          }
        })}
    </Row>
  );
}
