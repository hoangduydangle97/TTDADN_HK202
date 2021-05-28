import {
  faEllipsisH,
  faEdit,
  faTrashAlt,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  ButtonGroup,
  Dropdown,
  Button,
} from '@themesberg/react-bootstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from 'routes';
import { axiosLocal } from '../../api/local-api';
import { DeviceService } from 'services/devices.service';
import { DEVICE_TYPE_TEXT } from '../../const';

const DeviceRow = (props) => {
  const { id, name, feed, type, onDelete } = props;

  return (
    <Tr>
      <Td>{name}</Td>
      <Td>
        <span className="fw-normal">{feed}</span>
      </Td>
      <Td>
        <span className="fw-normal">{DEVICE_TYPE_TEXT[type]}</span>
      </Td>
      <Td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle
            as={Button}
            split
            variant="link"
            className="text-dark m-0 p-0"
          >
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to={Routes.Devices.edit.replace(':id', id)}
            >
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={() => onDelete(id)}>
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Td>
    </Tr>
  );
};

export function Devices() {
  let [devices, setDevices] = React.useState([]);

  function handleDelete(id) {
    axiosLocal.delete(`/devices/${id}`).then((res) => {
      setDevices((devices) => devices.filter((item) => item.id !== id));
    });
  }

  React.useEffect(() => {
    DeviceService.getAll().then((res) => {
      setDevices(res.data);
    });
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Button
          variant="primary"
          size="sm"
          as={Link}
          to={Routes.Devices.create}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          New device
        </Button>
      </div>

      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body>
          <Card.Title>
            <b>Devices</b>
          </Card.Title>
          <Table className="user-table align-items-center">
            <Thead>
              <Tr>
                <Th>Device name</Th>
                <Th>Device feed</Th>
                <Th>Type</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {devices &&
                devices.map((t) => (
                  <DeviceRow key={`${t.id}`} {...t} onDelete={handleDelete} />
                ))}
            </Tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}
