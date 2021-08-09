import mongoose from 'mongoose';
import { app } from './app';
import { mqttAutomation } from './mqtt-automation';
import { __MONGO_URI__, __PORT__ } from './utils/environments';

const start = async () => {
  try {
    await mongoose.connect(__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'test',
      user: 'root',
      pass: 'pass12345',
    });

    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
};

app.listen(__PORT__, async () => {
  console.log(`Listening on port ${__PORT__}`);

  let result = await mqttAutomation.connect().catch(console.log);
  await mqttAutomation.subscribe('light');
  await mqttAutomation.subscribe('temperature');
  await mqttAutomation.subscribe('pump');
  await mqttAutomation.updateListeners();
});

start();
