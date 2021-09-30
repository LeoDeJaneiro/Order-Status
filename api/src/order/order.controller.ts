import { Get, Param, Controller } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  async getOrders() {
    return await this.orderService.getJoinedOrders();
  }

  @Get(':id')
  async getOrder(@Param('id') id: String) {
    return await this.orderService.getOrderDetailById(id);
  }
}
