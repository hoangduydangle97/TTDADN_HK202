import { __ADAFRUIT_USER__ } from './environments';

export function getTopic(feed: string) {
  return `${__ADAFRUIT_USER__}/feeds/${feed}`;
}

export function compare(opCode: string, left: any, right: any) {
  try {
    console.log('OPCODE', opCode, left, right);
    switch (opCode) {
      case '<':
        return left < right;

      case '=':
        return left == right;

      case '>':
        return left > right;

      default:
        return false;
    }
  } catch {
    console.log('CATCH');
    return false;
  }
}
