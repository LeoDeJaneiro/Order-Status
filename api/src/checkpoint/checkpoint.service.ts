import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { getCheckpointsOfTracking } from '../data';

@Injectable()
export class CheckpointService {
  constructor() {}

  async getCheckpoints(trackingNo) {
    try {
      return await getCheckpointsOfTracking(trackingNo);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
