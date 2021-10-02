import { Module } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CheckpointController } from './checkpoint.controller';

@Module({
  providers: [CheckpointService],
  controllers: [CheckpointController]
})
export class CheckpointModule {}
