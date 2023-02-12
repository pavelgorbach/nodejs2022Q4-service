import { Injectable, NotFoundException } from '@nestjs/common';

import { Db } from '../db/db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private db: Db) {}

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const track = this.db.tracks.find((t) => t.id === id);

    if (!track) {
      throw new NotFoundException(`Not found`);
    }

    return track;
  }

  create(createTrackDto: CreateTrackDto) {
    const track = new Track(
      createTrackDto.name,
      createTrackDto.artistId,
      createTrackDto.albumId,
      createTrackDto.duration,
    );
    this.db.tracks.push(track);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.db.tracks.find((t) => t.id === id);

    if (!track) {
      throw new NotFoundException(`Not found`);
    }

    track.update(updateTrackDto);

    return track;
  }

  remove(id: string) {
    const idx = this.db.tracks.findIndex((t) => t.id === id);

    if (idx === -1) {
      throw new NotFoundException(`Not found`);
    }

    this.db.tracks.splice(idx, 1);
  }
}
