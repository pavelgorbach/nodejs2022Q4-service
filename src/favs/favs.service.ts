import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';

import { Db } from '../db/db';

@Injectable()
export class FavsService {
  constructor(private db: Db) {}

  findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Not found');
    }
    return album;
  }

  findAll() {
    const artists = this.db.artists.filter((artist) =>
      this.db.favorites.artists.includes(artist.id),
    );

    const tracks = this.db.tracks.filter((track) =>
      this.db.favorites.tracks.includes(track.id),
    );

    const albums = this.db.albums.filter((album) =>
      this.db.favorites.albums.includes(album.id),
    );

    return {
      artists,
      tracks,
      albums,
    };
  }

  createArtist(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new UnprocessableEntityException('Not found');
    }
    this.db.favorites.artists.push(id);
    return { message: 'Artist successfully added' };
  }

  createAlbum(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new UnprocessableEntityException('Not found');
    }
    this.db.favorites.albums.push(id);
    return { message: 'Album successfully added' };
  }

  createTrack(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new UnprocessableEntityException('Not found');
    }
    this.db.favorites.tracks.push(id);
    return { message: 'Track successfully added' };
  }

  removeTrack(id: string, skipHttpError = false) {
    const track = this.db.favorites.tracks.find((item) => item === id);
    if (!track && !skipHttpError) {
      throw new NotFoundException('Not found');
    }
    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (item) => item !== id,
    );
  }

  removeAlbum(id: string, skipHttpError = false) {
    const album = this.db.favorites.albums.find((item) => item === id);
    if (!album && !skipHttpError) {
      throw new NotFoundException('Not found');
    }
    this.db.favorites.albums = this.db.favorites.albums.filter(
      (item) => item !== id,
    );
  }

  removeArtist(id: string, skipHttpError = false) {
    const artist = this.db.favorites.artists.find((item) => item === id);
    if (!artist && !skipHttpError) {
      throw new NotFoundException('Not found');
    }
    this.db.favorites.artists = this.db.favorites.artists.filter(
      (item) => item !== id,
    );
  }
}
