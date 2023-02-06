import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  users: User[] = [];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`Not found`);
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto.login, createUserDto.password);
    this.users.push(user);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`Not found`);
    }

    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException(`Incorrect password`);
    }

    user.update({ password: updateUserDto.newPassword });

    return user;
  }

  delete(id: string) {
    const idx = this.users.findIndex((u) => u.id === id);

    if (idx === -1) {
      throw new NotFoundException(`Not found`);
    }

    this.users.splice(idx, 1);
  }
}
