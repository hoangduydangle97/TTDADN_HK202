import React, { useState } from 'react';
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Routes } from 'routes';
import { DeviceService } from '../../services/devices.service';
import { RULE_OPERATOR } from 'const';
import { RuleService } from 'services/rules.service';

export const RuleCreate = ({ match }) => {
  const { id } = match.params;
  const [devices, setDevices] = useState([]);

  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  function onSubmit(formVal) {
    if (id) {
      var res = RuleService.update(id, formVal.data);
    } else {
      res = RuleService.create(formVal.data);
    }

    res.then(() => history.push(Routes.Rules.list));
  }

  React.useEffect(() => {
    if (id) {
      RuleService.getOne(id).then((rule) => {
        Object.keys(rule).forEach((key) => setValue(key, rule[key]));
      });
    }

    DeviceService.getAll().then((res) => {
      setDevices(res.data);
    });
  }, [id]);

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Rule information</h5>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Rule name</Form.Label>
                <Form.Control
                  required
                  {...register('data.name')}
                  type="text"
                  placeholder="Enter rule name"
                />
              </Form.Group>
            </Col>
          </Row>
          <h5 className="mb-4">IF</h5>
          <Row>
            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>Value of Device:</Form.Label>
                <Form.Select {...register('data.conditionDevice')} required>
                  {Object.values(devices).map((device) => {
                    return (
                      <option key={device.id} value={device.id}>
                        {device.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>Operator</Form.Label>
                <Form.Select
                  {...register('data.conditionOperator')}
                  required
                  defaultValue={RULE_OPERATOR.EQUAL}
                >
                  {Object.values(RULE_OPERATOR).map((value) => {
                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>Value</Form.Label>
                <Form.Control
                  required
                  {...register('data.conditionValue')}
                  type="text"
                  placeholder="Enter value"
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mb-4">THEN</h5>
          <Row>
            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>Value of Device:</Form.Label>
                <Form.Select {...register('data.targetDevice')} required>
                  {Object.values(devices).map((device) => {
                    return (
                      <option key={device.id} value={device.id}>
                        {device.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>Set to Value</Form.Label>
                <Form.Control
                  required
                  {...register('data.targetValue')}
                  type="text"
                  placeholder="Enter value"
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
