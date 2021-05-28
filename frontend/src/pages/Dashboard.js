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

export function Dashboard() {
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
        <Col xs={6} className="mb-4">
          <TemperatureWidget feed="temperature" />
        </Col>
        <Col xs={6} className="mb-4">
          <GasWidget feed="gas" />
        </Col>
        <Col xs={6} className="mb-4">
          <WaterPumpWidget feed="pump" />
        </Col>
        <Col xs={6} className="mb-4">
          <LightWidget feed="led" />
        </Col>
      </Row>
    </>
  );
}
