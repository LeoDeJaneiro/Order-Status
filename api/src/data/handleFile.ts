import { createReadStream } from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import { memoize, get } from 'lodash';

const fileMap = {
  orders: 'files/trackings.csv',
  checkpoints: 'files/checkpoints.csv',
};

export const parseOrders = memoize(() => {
  const results = [];
  const filePath = path.join(__dirname, get(fileMap, 'orders'));
  return new Promise((resolve, reject) =>
    createReadStream(filePath)
      .on('error', (err) => {
        reject(err);
      })
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      }),
  );
});

export const parseCheckpoints = memoize(() => {
  const results = [];
  const filePath = path.join(__dirname, get(fileMap, 'checkpoints'));
  return new Promise((resolve, reject) =>
    createReadStream(filePath)
      .on('error', (err) => {
        reject(err);
      })
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results.sort((a, b) => a.timestamp - b.timestamp));
      }),
  );
});
