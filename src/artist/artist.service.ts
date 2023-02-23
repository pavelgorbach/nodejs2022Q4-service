import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException(`Not found`);
    }

    return artist;
  }

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistRepository.save(createArtistDto);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    return await this.artistRepository.save({ ...artist, ...updateArtistDto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.artistRepository.delete(id);
  }

  async isExists(id: string) {
    return await this.artistRepository.findOneBy({ id });
  }
}
