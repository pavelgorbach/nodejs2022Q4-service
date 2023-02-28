import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateTokenDTO } from './dto/update-token.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByLogin(loginDto.login);

    if (user) {
      const isPasswordEquals = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (user && isPasswordEquals) {
        return this.sign(user.id, user.login);
      }
    } else {
      throw new ForbiddenException({ message: 'Invalid data' });
    }
  }

  private sign(userId: string, login: string) {
    return {
      accessToken: this.jwtService.sign({ userId, login }),
      refreshToken: this.jwtService.sign(
        { userId, login },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    };
  }

  async refresh(updateTokenDTO: UpdateTokenDTO) {
    try {
      const { userId, login } = await this.jwtService.verify(
        updateTokenDTO.refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      );

      return this.sign(userId, login);
    } catch (err) {
      throw new ForbiddenException({ message: 'Invalid data' });
    }
  }
}
