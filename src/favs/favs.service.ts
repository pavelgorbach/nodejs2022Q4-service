import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UnprocessableEntityException,
  ConflictException,
} from '@nestjs/common/exceptions';

import { TrackService } from './../track/track.service';
import { ArtistService } from './../artist/artist.service';
import { AlbumService } from './../album/album.service';
import { Fav } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Fav)
    private favoritesRepository: Repository<Fav>,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async findAll() {
    const favs = await this.favoritesRepository.findOne({
      where: { id: 1 },
      relations: ['albums', 'artists', 'tracks'],
    });

    if (!favs) {
      await this.favoritesRepository.save({ id: 1 });
      return this.findAll();
    }
    return favs;
  }

  async createArtist(id: string) {
    const isExists = await this.artistService.isExists(id);

    if (!isExists) {
      throw new UnprocessableEntityException('Not found');
    }

    const favItem = await this.favoritesRepository.findOne({
      where: { id: 1 },
      select: ['artists'],
      relations: ['artists'],
    });

    const inFavs = favItem['artists'].some((artist) => artist.id === id);

    if (inFavs) {
      throw new ConflictException('Already in favorites');
    }

    await this.favoritesRepository.save({
      id: 1,
      artists: [...favItem['artists'], isExists],
    });

    return { message: 'Artist successfully added' };
  }

  async createAlbum(id: string) {
    const isExists = await this.albumService.isExists(id);

    if (!isExists) {
      throw new UnprocessableEntityException('Not found');
    }

    const favItem = await this.favoritesRepository.findOne({
      where: { id: 1 },
      select: ['albums'],
      relations: ['albums'],
    });

    const inFavs = favItem['albums'].some((album) => album.id === id);

    if (inFavs) {
      throw new ConflictException('Already in favorites');
    }

    await this.favoritesRepository.save({
      id: 1,
      albums: [...favItem['albums'], isExists],
    });

    return { message: 'Album successfully added' };
  }

  async createTrack(id: string) {
    const isExists = await this.trackService.isExists(id);

    if (!isExists) {
      throw new UnprocessableEntityException('Not found');
    }

    const favItem = await this.favoritesRepository.findOne({
      where: { id: 1 },
      select: ['tracks'],
      relations: ['tracks'],
    });

    const inFavs = favItem['tracks'].some((track) => track.id === id);

    if (inFavs) {
      throw new ConflictException('Already in favorites');
    }

    await this.favoritesRepository.save({
      id: 1,
      tracks: [...favItem['tracks'], isExists],
    });

    return { message: 'Track successfully added' };
  }

  async removeTrack(id: string) {
    const isExists = await this.trackService.isExists(id);

    if (!isExists) {
      throw new UnprocessableEntityException('Not found');
    }

    const favItem = await this.favoritesRepository.findOne({
      where: { id: 1 },
      select: ['tracks'],
      relations: ['tracks'],
    });

    const inFavs = favItem['tracks'].some((track) => track.id === id);

    if (!inFavs) {
      throw new ConflictException('Not found');
    }

    const spliceIndex = favItem['tracks'].findIndex((item) => item.id === id);
    favItem['tracks'].splice(spliceIndex, 1);

    await this.favoritesRepository.save({
      id: 1,
      tracks: favItem['tracks'],
    });
  }

  async removeAlbum(id: string) {
    const isExists = await this.albumService.isExists(id);

    if (!isExists) {
      throw new UnprocessableEntityException('Not found');
    }

    const favItem = await this.favoritesRepository.findOne({
      where: { id: 1 },
      select: ['albums'],
      relations: ['albums'],
    });

    const inFavs = favItem['albums'].some((track) => track.id === id);

    if (!inFavs) {
      throw new ConflictException('Not found');
    }

    const spliceIndex = favItem['albums'].findIndex((item) => item.id === id);
    favItem['albums'].splice(spliceIndex, 1);

    await this.favoritesRepository.save({
      id: 1,
      albums: favItem['albums'],
    });
  }

  async removeArtist(id: string) {
    const isExists = await this.artistService.isExists(id);

    if (!isExists) {
      throw new UnprocessableEntityException('Not found');
    }

    const favItem = await this.favoritesRepository.findOne({
      where: { id: 1 },
      select: ['artists'],
      relations: ['artists'],
    });

    const inFavs = favItem['artists'].some((artist) => artist.id === id);

    if (!inFavs) {
      throw new ConflictException('No found');
    }

    const spliceIndex = favItem['artists'].findIndex((item) => item.id === id);
    favItem['artists'].splice(spliceIndex, 1);

    await this.favoritesRepository.save({
      id: 1,
      artists: favItem['artists'],
    });
  }
}
