import { useMqttState } from 'mqtt-react-hooks';
import React from 'react';

export default function LightSwitch() {
  const { client } = useMqttState();

  function handleClick(message) {
    return client.publish('quangtuan9237/feeds/led', message);
  }

  return (
    <>
      <button type="button" onClick={() => handleClick('ON')}>
        Turn On
      </button>
      <button type="button" onClick={() => handleClick('OFF')}>
        Turn Off
      </button>
    </>
  );
}
