import { ADAFRUIT_USER } from 'const';

export function getTopic(feed) {
  return `${ADAFRUIT_USER}/feeds/${feed}`;
}
