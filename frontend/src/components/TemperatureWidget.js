import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFire,
  faTemperatureLow,
  faLightbulb,
  faTint,
} from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card } from '@themesberg/react-bootstrap';
import { useMqttState } from 'mqtt-react-hooks';
import { getTopic } from '../utils';
import { useFeedData } from '../hooks/useFeedData';

export const CustomWidget = (props) => {
  const { icon, iconColor, title, value, onClick } = props;

  return (
    <Card onClick={onClick} border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <div className="d-sm-none">
            <h3 className="mb-1">{title}</h3>
          </div>
          <Col
            xl={5}
            className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
          >
            <div
              className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0`}
            >
              <FontAwesomeIcon icon={icon} />
            </div>
            <div className="d-sm-none">
              <h3 className="mb-1">{value}</h3>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export function TemperatureWidget({ feed }) {
  const status = useFeedData(feed);

  return (
    <CustomWidget title="Temperature" value={status} icon={faTemperatureLow} />
  );
}
export function GasWidget({ feed }) {
  const status = useFeedData(feed);

  return (
    <CustomWidget
      title="Gas"
      value={status === 'OFF' ? 'NORMAL' : 'DANGER'}
      icon={faFire}
    />
  );
}
export function LightWidget({ feed }) {
  const { client } = useMqttState();
  const status = useFeedData(feed);

  function handleClick() {
    return client.publish(getTopic(feed), status === 'ON' ? 'OFF' : 'ON');
  }

  return (
    <CustomWidget
      key={feed}
      onClick={handleClick}
      title="Light"
      value={status}
      icon={faLightbulb}
    />
  );
}
export function WaterPumpWidget({ feed }) {
  const { client } = useMqttState();
  const status = useFeedData(feed);

  function handleClick() {
    return client.publish(getTopic(feed), status === 'ON' ? 'OFF' : 'ON');
  }

  return (
    <CustomWidget
      key={feed}
      onClick={handleClick}
      title="Water Pump"
      value={status}
      icon={faTint}
    />
  );
}
