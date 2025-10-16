import pino from 'pino';
import fs from 'fs';
import path from 'path';

export function createLogger(name = 'run') {
  const dir = path.resolve('selenium/artifacts/logs');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${name.replace(/[^\w\-]+/g, '_')}.log`);
  const level = process.env.LOG_LEVEL || 'info';
  return pino({ level, base: undefined }, pino.destination({ dest: file, sync: false }));
}
