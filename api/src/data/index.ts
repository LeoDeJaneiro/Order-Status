import { memoize, chain, get, pick } from 'lodash';

import { parseOrders, parseCheckpoints } from './handleFile';

const preProcessCheckpoints = memoize(async () => {
  const checkpoints = await parseCheckpoints();
  return chain(checkpoints)
    .sortBy(['timestamp'])
    .groupBy((checkpoint) => checkpoint.tracking_number)
    .value();
});

const getOrdersOverview = memoize(async (email) => {
  let orders = await parseOrders();
  const checkpointMap = await preProcessCheckpoints();

  return chain(orders)
    .filter({ email })
    .uniqBy(({ tracking_number }) => tracking_number)
    .map((order) => ({
      ...pick(order, ['status', 'orderNo', 'street', 'zip_code']),
      status: chain(checkpointMap)
        .get(order.tracking_number, [{ status_text: 'unknown status' }])
        .last()
        .value(),
    }))
    .groupBy(({ orderNo }) => orderNo)
    .value();
});

const getOrder = async (orderNo) => {
  const orders = await parseOrders();
  const checkpoints = await preProcessCheckpoints();

  return chain(orders)
    .filter({ orderNo })
    .reduce(
      (acc, order) => ({
        ...acc,
        ...(!get(acc, ['trackings', order.tracking_number])
          ? {
              tracking: {
                ...acc.tracking,
                [order.tracking_number]: get(
                  checkpoints,
                  order.tracking_number,
                ),
              },
            }
          : {}),
        products: [
          ...get(acc, 'products', []),
          pick(order, [
            'articleNo',
            'articleImageUrl',
            'quantity',
            'product_name',
            'tracking_number',
          ]),
        ],
        ...pick(order, ['orderNo', 'courier', 'street', 'zip_code']),
      }),
      {},
    )
    .value();
};

const getCheckpointsOfTracking = async (tracking_number) => {
  const checkpoints = await preProcessCheckpoints();
  return get(checkpoints, tracking_number);
};

export { getOrdersOverview, getOrder, getCheckpointsOfTracking };
