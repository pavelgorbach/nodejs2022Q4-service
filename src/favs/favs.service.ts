import { Injectable } from '@nestjs/common';

import { Fav } from './entities/fav.entity';

@Injectable()
export class FavsService {
  favorites: Fav[] = [];

  findAll() {
    return this.favorites;
  }
}
