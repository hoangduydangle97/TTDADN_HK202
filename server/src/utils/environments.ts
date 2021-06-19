if (!process.env.JWT_KEY) {
  throw new Error('JWT_KEY must be defined');
}

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI must be defined');
}

if (!process.env.ADAFRUIT_USER) {
  throw new Error('ADAFRUIT_USER must be defined');
}

if (!process.env.ADAFRUIT_KEY) {
  throw new Error('ADAFRUIT_KEY must be defined');
}

export const __MONGO_URI__ = process.env.MONGO_URI;
export const __JWT_KEY__ = process.env.JWT_KEY;
export const __ADAFRUIT_USER__ = process.env.ADAFRUIT_USER;
export const __ADAFRUIT_KEY__ = process.env.ADAFRUIT_KEY;
