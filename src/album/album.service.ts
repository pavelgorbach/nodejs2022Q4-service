import { Injectable, NotFoundException } from '@nestjs/common';

import { Db } from '../db/db';
import { FavsService } from '../favs/favs.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private db: Db, private favsService: FavsService) {}

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const user = this.db.albums.find((a) => a.id === id);

    if (!user) {
      throw new NotFoundException(`Not found`);
    }

    return user;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );

    this.db.albums.push(album);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.db.albums.find((a) => a.id === id);

    if (!album) {
      throw new NotFoundException(`Not found`);
    }

    album.update(updateAlbumDto);

    return album;
  }

  remove(id: string) {
    const idx = this.db.albums.findIndex((a) => a.id === id);

    if (idx === -1) {
      throw new NotFoundException(`Not found`);
    }

    const inFavorites = this.favsService.findOne(id);

    if (!inFavorites) {
      this.favsService.removeAlbum(id);
    }

    const tracks = this.db.tracks.filter((track) => track.albumId === id);
    tracks.forEach((track) => {
      track.albumId = null;
    });

    this.db.albums.splice(idx, 1);
  }
}
