import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
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

app.listen(5200, () => {
  console.log('Listening on port 5200');
});

start();
