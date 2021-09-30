import * as csv from 'csv-parser';
import { createReadStream } from 'fs';
import * as path from 'path';
import { memoize, filter, chain, get, groupBy } from 'lodash';

const parseOrders = memoize(() => {
  const results = [];
  const filePath = path.join(__dirname, 'trackings.csv');
  return new Promise((resolve) =>
    createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      }),
  );
});

const parseCheckpoints = memoize(() => {
  const results = [];
  const filePath = path.join(__dirname, 'checkpoints.csv');
  return new Promise((resolve) =>
    createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results.sort((a, b) => a.timestamp - b.timestamp));
      }),
  );
});

const getOrders = memoize(async () => {
  const orders = await parseOrders();
  return chain(orders)
    .groupBy((order) => order.orderNo)
    .reduce(
      (acc, order, orderNo) => ({
        ...acc,
        [orderNo]: {
          ...groupBy(order, (item) => item.tracking_number),
        },
      }),
      {},
    )
    .value();
});

const getOrder = async (orderNo) => {
  const orders = await getOrders();
  return get(orders, orderNo);
};

const getCheckpointsOfTracking = async (trackingId) => {
  const checkpoints = await parseCheckpoints();
  return filter(checkpoints, { tracking_number: trackingId });
};

export { getOrders, getOrder, getCheckpointsOfTracking };
