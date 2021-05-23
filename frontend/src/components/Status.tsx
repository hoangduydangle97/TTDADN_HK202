import { useMqttState } from 'mqtt-react-hooks';
import React from 'react';

// 1 component thuong tu ben JS thoi
export default function Status() {
  // useMqttState la hook
  const { connectionStatus,  } = useMqttState();

  return <h1>{`Status: ${connectionStatus}`}</h1>;
}
