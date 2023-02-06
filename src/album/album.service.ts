import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  albums: Album[] = [];

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const user = this.albums.find((a) => a.id === id);

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

    this.albums.push(album);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.albums.find((a) => a.id === id);

    if (!album) {
      throw new NotFoundException(`Not found`);
    }

    album.update(updateAlbumDto);

    return album;
  }

  remove(id: string) {
    const idx = this.albums.findIndex((a) => a.id === id);

    if (idx === -1) {
      throw new NotFoundException(`Not found`);
    }

    this.albums.splice(idx, 1);
  }
}
