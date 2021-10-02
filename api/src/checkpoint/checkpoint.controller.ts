import { Get, Param, Controller } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';

@Controller('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}
  @Get(':id')
  async getOrder(@Param('id') id: String) {
    return await this.checkpointService.getCheckpoints(id);
  }
}
