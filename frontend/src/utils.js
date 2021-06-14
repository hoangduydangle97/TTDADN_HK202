import { __ADAFRUIT_USER__ } from 'share/environments';

export function getTopic(feed) {
  return `${__ADAFRUIT_USER__}/feeds/${feed}`;
}
