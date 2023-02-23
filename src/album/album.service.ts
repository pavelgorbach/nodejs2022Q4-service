import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new NotFoundException(`Not found`);
    }

    return album;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumRepository.save(createAlbumDto);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    return this.albumRepository.save({ ...album, ...updateAlbumDto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.albumRepository.delete(id);
  }

  async isExists(id: string) {
    return await this.albumRepository.findOneBy({ id });
  }
}
