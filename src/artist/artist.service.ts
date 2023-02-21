import { Injectable, NotFoundException } from '@nestjs/common';

import { Db } from '../db/db';
import { FavsService } from '../favs/favs.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private db: Db, private favsService: FavsService) {}

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const artist = this.db.artists.find((a) => a.id === id);

    if (!artist) {
      throw new NotFoundException(`Not found`);
    }

    return artist;
  }

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto.name, createArtistDto.grammy);
    this.db.artists.push(artist);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.db.artists.find((a) => a.id === id);

    if (!artist) {
      throw new NotFoundException(`Not found`);
    }

    artist.update(updateArtistDto);

    return artist;
  }

  remove(id: string) {
    const idx = this.db.artists.findIndex((u) => u.id === id);

    if (idx === -1) {
      throw new NotFoundException(`Not found`);
    }

    const tracks = this.db.tracks.filter((track) => track.artistId === id);
    tracks.forEach((track) => {
      track.artistId = null;
    });

    this.db.artists.splice(idx, 1);
  }
}
