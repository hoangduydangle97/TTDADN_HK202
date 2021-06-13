import React from 'react';
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Routes } from 'routes';
import { RoomService } from 'services/rooms.service';

export const RoomCreate = ({ match }) => {
  const { id } = match.params;

  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  function onSubmit(formVal) {
    if (id) {
      var res = RoomService.update(id, formVal.data);
    } else {
      res = RoomService.create(formVal.data);
    }

    res.then(() => history.push(Routes.Rooms.list));
  }

  React.useEffect(() => {
    if (id) {
      RoomService.getOne(id).then((room) => {
        Object.keys(room).forEach((key) => setValue(key, room[key]));
      });
    }
  }, [id]);

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Room information</h5>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Room name</Form.Label>
                <Form.Control
                  required
                  {...register('data.name')}
                  type="text"
                  placeholder="Enter room name"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Room icon</Form.Label>
                <Form.Control
                  required
                  {...register('data.icon')}
                  type="text"
                  placeholder="Enter room icon"
                />
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
