import { Module } from '@nestjs/common';

import { Db } from '../db/db';
import { FavsService } from '../favs/favs.service';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [Db, AlbumService, FavsService],
})
export class AlbumModule {}
