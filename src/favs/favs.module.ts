import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistModule } from './../artist/artist.module';
import { AlbumModule } from './../album/album.module';
import { TrackModule } from './../track/track.module';
import { Fav } from './entities/fav.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fav]),
    ArtistModule,
    AlbumModule,
    TrackModule,
  ],
  controllers: [FavsController],
  providers: [FavsService],
  exports: [FavsService],
})
export class FavsModule {}
