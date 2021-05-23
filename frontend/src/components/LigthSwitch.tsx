import React from 'react';
import { useMqttState } from 'mqtt-react-hooks';


// day la component chua 2 cai nu't nhan' ne
// connect duoc roi, gio muon dieu khien cai led tren adafruit phai cap nhat topic cho dung
// xong
export default function LightSwitch() {
  const { client } = useMqttState();

  function handleClick(message) {
    return client.publish('quangtuan2440/feeds/led', message);
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
