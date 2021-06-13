import React, { useState } from 'react';
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Routes } from 'routes';
import { DeviceService } from '../../services/devices.service';
import { DEVICE_TYPE } from 'const';
import { DEVICE_TYPE_TEXT } from '../../const';
import { RoomService } from 'services/rooms.service';

export const DeviceCreate = ({ match }) => {
  const { id } = match.params;
  const [rooms, setRooms] = useState([]);

  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  function onSubmit(formVal) {
    if (id) {
      var res = DeviceService.update(id, formVal.data);
    } else {
      res = DeviceService.create(formVal.data);
    }

    res.then(() => history.push(Routes.Devices.list));
  }

  React.useEffect(() => {
    if (id) {
      DeviceService.getOne(id).then((device) => {
        Object.keys(device).forEach((key) => setValue(key, device[key]));
      });
    }

    RoomService.getAll().then((res) => {
      setRooms(res.data);
    });
  }, [id]);

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Device information</h5>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Device name</Form.Label>
                <Form.Control
                  required
                  {...register('data.name')}
                  type="text"
                  placeholder="Enter your device name"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Device feed</Form.Label>
                <Form.Control
                  required
                  {...register('data.feed')}
                  type="text"
                  placeholder="Enter device feed"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Select
                  {...register('data.type')}
                  required
                  defaultValue={DEVICE_TYPE.TEMPERATURE_SENSOR}
                >
                  {Object.values(DEVICE_TYPE).map((key) => {
                    return (
                      <option key={key} value={key}>
                        {DEVICE_TYPE_TEXT[key]}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Room</Form.Label>
                <Form.Select {...register('data.room')} required>
                  {Object.values(rooms).map((room) => {
                    return (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="submit">
              {id ? 'Update' : 'Create'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
