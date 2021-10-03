import { getOrdersOverview, getOrder } from './index';
import trackings from './__mocks/trackings';
import checkpoints from './__mocks/checkpoints';

jest.mock('./handleFile', () => ({
  __esModule: true,
  parseOrders: jest.fn(() => trackings),
  parseCheckpoints: jest.fn(() => checkpoints),
}));

describe('data', () => {
  describe('getOrders', () => {
    it('should return grouped orders incl list of trackings and their last checkpoint', async () => {
      expect(await getOrdersOverview('')).toEqual({});
      expect(await getOrdersOverview('julian@parcellab.com')).toEqual({
        '780XX004': [
          {
            orderNo: '780XX004',
            status: {
              location: '',
              status: 'OrderProcessed',
              status_details: 'The order has been processed.',
              status_text: 'Order processed',
              timestamp: '2020-03-01T00:00:00.000Z',
              tracking_number: '00331612197202003141',
            },
            street: 'Schillerstr. 23a',
            zip_code: '10625',
          },
        ],
        'ORD-123-2018': [
          {
            orderNo: 'ORD-123-2018',
            status: {
              location: '',
              status: 'Scheduled',
              status_details:
                'An appointment to make the delivery has been made. The goods will be delivered on Saturday, Apr 7th, 2018, between 9:30 am and 1:00 pm.',
              status_text: 'Delivery date set',
              timestamp: '2018-04-06T05:58:00.000Z',
              tracking_number: '00340000161200000001',
            },
            street: 'Landwehrstr. 39',
            zip_code: '80336',
          },
          {
            orderNo: 'ORD-123-2018',
            status: {
              location: '',
              status: 'OrderProcessed',
              status_details: 'The order has been processed.',
              status_text: 'Order processed',
              timestamp: '2018-04-01T00:00:00.000Z',
              tracking_number: '9999999',
            },
            street: 'Landwehrstr. 39',
            zip_code: '80336',
          },
        ],
      });
    });
  });

  describe('getOrder', () => {
    it('should return order incl products and trackings', async () => {
      expect(await getOrder('ORD-123-2018')).toEqual({
        tracking: {
          '00340000161200000001': [
            {
              location: '',
              status: 'OrderProcessed',
              status_details: 'The order has been processed.',
              status_text: 'Order processed',
              timestamp: '2018-04-01T00:00:00.000Z',
              tracking_number: '00340000161200000001',
            },
            {
              location: '',
              status: 'Upgrade',
              status_details: 'The goods are being finished and personalised.',
              status_text: 'Finishing',
              timestamp: '2018-04-04T12:17:00.000Z',
              tracking_number: '00340000161200000001',
            },
            {
              location: 'Feucht',
              status: 'InboundScan',
              status_details: 'The goods have been sent.',
              status_text: 'Dispatched',
              timestamp: '2018-04-04T18:14:59.000Z',
              tracking_number: '00340000161200000001',
            },
            {
              location: '',
              status: 'PickUpPlanned',
              status_details:
                'The goods will be handed over to the logistics company at the latest at the defined time.',
              status_text: 'Pick-up planned',
              timestamp: '2018-04-04T23:00:00.000Z',
              tracking_number: '00340000161200000001',
            },
            {
              location: 'Rüdersdorf',
              status: 'DestinationDeliveryCenter',
              status_details:
                'The goods have arrived in the destination region.',
              status_text: 'Delivery is being prepared',
              timestamp: '2018-04-06T04:54:00.000Z',
              tracking_number: '00340000161200000001',
            },
            {
              location: '',
              status: 'Scheduled',
              status_details:
                'An appointment to make the delivery has been made. The goods will be delivered on Saturday, Apr 7th, 2018, between 9:30 am and 1:00 pm.',
              status_text: 'Delivery date set',
              timestamp: '2018-04-06T05:58:00.000Z',
              tracking_number: '00340000161200000001',
            },
          ],
          '9999999': [
            {
              location: '',
              status: 'OrderProcessed',
              status_details: 'The order has been processed.',
              status_text: 'Order processed',
              timestamp: '2018-04-01T00:00:00.000Z',
              tracking_number: '9999999',
            },
          ],
        },
        courier: 'DHL',
        orderNo: 'ORD-123-2018',
        products: [
          {
            articleImageUrl:
              'http://cdn.parcellab.com/img/sales-cannon/parcellab-bag.jpg',
            articleNo: 'A-B2-U',
            product_name: 'parcelLab Tote Bag',
            quantity: '1',
            tracking_number: '00340000161200000001',
          },
          {
            articleImageUrl:
              'http://cdn.parcellab.com/img/sales-cannon/parcellab-cap.jpg',
            articleNo: 'A-C1-L',
            product_name: 'parcelLab Branded Cap',
            quantity: '2',
            tracking_number: '9999999',
          },
        ],
        street: 'Landwehrstr. 39',
        zip_code: '80336',
      });
    });
  });
});
