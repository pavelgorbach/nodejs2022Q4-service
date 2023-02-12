import { Module } from '@nestjs/common';

import { Db } from '../db/db';
import { FavsService } from '../favs/favs.service';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  controllers: [ArtistController],
  providers: [Db, ArtistService, FavsService],
})
export class ArtistModule {}
