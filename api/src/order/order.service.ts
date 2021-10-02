import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { getOrdersOverview, getOrder } from '../data';

@Injectable()
export class OrderService {
  constructor() {}

  async getJoinedOrders(email) {
    try {
      return await getOrdersOverview(email);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async getOrderDetailById(id) {
    try {
      return await getOrder(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
