import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { CheckpointModule } from './checkpoint/checkpoint.module';

@Module({
  imports: [OrderModule, CheckpointModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
