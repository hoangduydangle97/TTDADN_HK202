import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown } from '@themesberg/react-bootstrap';

import { Routes } from 'routes';
import { Link } from 'react-router-dom';
import {
  GasWidget,
  LightWidget,
  TemperatureWidget,
  WaterPumpWidget,
} from '../components/TemperatureWidget';
import { DeviceService } from 'services/devices.service';
import { DEVICE_TYPE } from 'const';

export function Dashboard() {
  let [devices, setDevices] = React.useState([]);

  React.useEffect(() => {
    DeviceService.getAll().then((res) => {
      setDevices(res.data);
    });
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown className="btn-toolbar">
          <Dropdown.Toggle
            as={Button}
            variant="primary"
            size="sm"
            className="me-2"
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            New
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item
              as={Link}
              to={Routes.Devices.create}
              className="fw-bold"
            >
              <FontAwesomeIcon icon={Routes.Devices.icon} className="me-2" />{' '}
              New device
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Row className="justify-content-md-center">
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
    </>
  );
}
