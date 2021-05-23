import React from 'react';
import logo from './logo.svg';
import './App.css';
import Status from './components/Status';
import { Connector } from 'mqtt-react-hooks';
import LightSwitch from './components/LigthSwitch';

// file nay la file root
// xogn key
// e
// cai yarn voi npm la 1 phai ko
// nó tương tự nhau á, ý là npm xai cái gì , yarn xài có đó cũng đc hả
// uh
// tại mới học, còn App.jsx với App.tsx giong nhau afwf :V uk
// nói chung là tui setup project này xài typescript nên đuôi nó là tsx
// còn ông setup project theo kiểu thường thì nó sẽ là file js.
// nói chung là làm ts thì tương tự như js thôi mà ts thì có thêm kiểu dữ liệu với auto suggestion, js ko có
// đang học cái bình thường á, có làm chung với ông đc ko
// vẫn làm bt được thôi ok, ko khác nhau nheiefu đâu 
function App() {
  return (
    <Connector
      brokerUrl="wss://io.adafruit.com:443"
      options={{
        username: 'quangtuan2440',
        password: 'aio_yWxR440a0q5c8sdgPhtWDOJy0XtC',
        connectTimeout: 60 * 1000,
        // hótnam
        // no' co auto complete ne js ko co' :V
        keepalive: 3600,
      }}
    >
      <Status />
      <LightSwitch></LightSwitch>
    </Connector>
  );
}

export default App;
