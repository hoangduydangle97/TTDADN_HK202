import React from 'react';
import logo from './logo.svg';
import './App.css';
import Status from './components/Status';
import { Connector } from 'mqtt-react-hooks';
import LightSwitch from './components/LigthSwitch';

function App() {
  return (
    <Connector
      brokerUrl="wss://io.adafruit.com:443"
      options={{
        username: 'quangtuan9237',
        password: 'aio_LviR66BXNAtRSqW6zQnKyG4rehIM',
        connectTimeout: 60 * 1000,
        keepalive: 3600,
      }}
    >
      <Status />
      <LightSwitch></LightSwitch>
    </Connector>
  );
}

export default App;
