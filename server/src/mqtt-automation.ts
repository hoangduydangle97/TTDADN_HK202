import { __ADAFRUIT_KEY__, __ADAFRUIT_USER__ } from './utils/environments';

import mqtt from 'mqtt';
import { Rule } from './models/Rules';
import { compare, getTopic } from './utils/helpers';

let client: mqtt.MqttClient;
const listenerMap = new Map();

function connect() {
  client = mqtt.connect({
    host: 'io.adafruit.com',
    port: 8883,
    protocol: 'mqtts',
    username: __ADAFRUIT_USER__,
    password: __ADAFRUIT_KEY__,
    reconnectPeriod: 1000,
    connectTimeout: 60 * 1000,
    keepalive: 3600,
  });

  return new Promise<boolean>((resolve, reject) => {
    client.on('connect', function () {
      resolve(true);
    });
  });
}

function subscribe(feed: string) {
  if (!client) {
    throw new Error('mqtt must be connected first.');
  }

  // console.log('TOPIC', `${__ADAFRUIT_USER__}/feeds/${feed}`);

  return new Promise((resolve, reject) => {
    client.subscribe(getTopic(feed), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

function udateOrAddRuleHandler(rule: any) {
  let handler = (topic: string, message: Buffer) => {
    if (topic === getTopic(rule.conditionDevice.feed)) {
      let condition = compare(
        rule.conditionOperator,
        message.toString(),
        rule.conditionValue
      );

      if (condition) {
        // if condition is true, then publish and event
        client.publish(getTopic(rule.targetDevice.feed), rule.targetValue);
      }
    }
  };

  // if (listenerMap.has(rule.id)) {
  //   //if existed then remove the old listener
  //   client.removeListener('message', listenerMap.get(rule.id));
  // }

  client.on('message', handler);
  listenerMap.set(rule.id, handler);
}

async function updateListeners() {
  const rules = await Rule.find()
    .populate('conditionDevice')
    .populate('targetDevice');

  removeAllListeners();

  rules.forEach((item) => {
    udateOrAddRuleHandler(item);
  });
}

function removeAllListeners() {
  client.removeAllListeners();
  listenerMap.clear();
}

export const mqttAutomation = { connect, subscribe, updateListeners };
