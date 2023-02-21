import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Db } from '../db/db';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private db: Db) {}

  findAll() {
    return this.db.users;
  }

  findOne(id: string) {
    const user = this.db.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`Not found`);
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto.login, createUserDto.password);
    this.db.users.push(user);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.db.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`Not found`);
    }

    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException(`Incorrect password`);
    }

    user.update({ password: updateUserDto.newPassword });

    return user;
  }

  remove(id: string) {
    const idx = this.db.users.findIndex((u) => u.id === id);

    if (idx === -1) {
      throw new NotFoundException(`Not found`);
    }

    this.db.users.splice(idx, 1);
  }
}
