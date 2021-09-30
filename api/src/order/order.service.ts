import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { getOrders, getOrder } from '../mockData/mockDB';

@Injectable()
export class OrderService {
  constructor() {}

  async getJoinedOrders() {
    try {
      return await getOrders();
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
