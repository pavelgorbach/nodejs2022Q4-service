import { Injectable } from '@nestjs/common';

import { User } from '../user/entities/user.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class Db {
  users: User[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
  favorites: {
    artists: string[];
    tracks: string[];
    albums: string[];
  } = {
    artists: [],
    tracks: [],
    albums: [],
  };

  private static db: Db;

  constructor() {
    if (!Db.db) {
      Db.db = this;
    }

    return Db.db;
  }
}
