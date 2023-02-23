import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException(`Not found`);
    }

    return track;
  }

  async create(createTrackDto: CreateTrackDto) {
    return await this.trackRepository.save(createTrackDto);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);
    return this.trackRepository.save({ ...track, ...updateTrackDto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.trackRepository.delete(id);
  }

  async isExists(id: string) {
    return await this.trackRepository.findOneBy({ id });
  }
}
