import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  artists: Artist[] = [];

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find((a) => a.id === id);

    if (!artist) {
      throw new NotFoundException(`Not found`);
    }

    return artist;
  }

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto.name, createArtistDto.grammy);
    this.artists.push(artist);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.artists.find((a) => a.id === id);

    if (!artist) {
      throw new NotFoundException(`Not found`);
    }

    artist.update(updateArtistDto);

    return artist;
  }

  remove(id: string) {
    const idx = this.artists.findIndex((u) => u.id === id);

    if (idx === -1) {
      throw new NotFoundException(`Not found`);
    }

    this.artists.splice(idx, 1);
  }
}
