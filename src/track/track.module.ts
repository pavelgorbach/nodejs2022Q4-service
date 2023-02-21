import { Module } from '@nestjs/common';

import { Db } from '../db/db';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  controllers: [TrackController],
  providers: [Db, TrackService],
})
export class TrackModule {}
