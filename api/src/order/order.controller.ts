import { Get, Param, Query, Controller } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  async getOrders(@Query('email') email: String) {
    return await this.orderService.getJoinedOrders(email);
  }

  @Get(':id')
  async getOrder(@Param('id') id: String) {
    return await this.orderService.getOrderDetailById(id);
  }
}
