import { Module } from '@nestjs/common';

import { Db } from '../db/db';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';

@Module({
  controllers: [FavsController],
  providers: [Db, FavsService],
  exports: [FavsService],
})
export class FavsModule {}
