import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Dropdown } from '@themesberg/react-bootstrap';

import { Routes } from 'routes';
import { Link } from 'react-router-dom';
import { RoomsDashboard } from './rooms/RoomsDasboard';

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
              to={Routes.Rooms.create}
              className="fw-bold"
            >
              <FontAwesomeIcon icon={Routes.Rooms.icon} className="me-2" /> New
              room
            </Dropdown.Item>
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

      <RoomsDashboard />
    </>
  );
}
