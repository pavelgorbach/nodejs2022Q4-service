import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Not found`);
    }

    return user;
  }

  async findByLogin(login: string) {
    return await this.userRepository.findOne({ where: { login } });
  }

  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(
      createUserDto.password,
      +process.env.CRYPT_SALT,
    );

    const user = new User(createUserDto.login, password);
    return await this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    const passwordsEuqal = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!passwordsEuqal) {
      throw new ForbiddenException(`Incorrect password`);
    }

    user.password = updateUserDto.newPassword;
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
}
