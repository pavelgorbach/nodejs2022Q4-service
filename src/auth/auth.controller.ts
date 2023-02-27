import { Controller, Post, Body } from '@nestjs/common';
import { UseInterceptors, HttpCode } from '@nestjs/common/decorators';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { StatusCodes } from 'http-status-codes';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { RefreshTokenCanBe } from './decorators/refresh-token.decorator';
import { WithoutAuth } from './decorators/without-auth.decorator';
import { LoginDto } from './dto/login.dto';
import { UpdateTokenDTO } from './dto/update-token.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @WithoutAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signup(@Body() signupDto: CreateUserDto) {
    return await this.authService.signup(signupDto);
  }

  @WithoutAuth()
  @HttpCode(StatusCodes.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @RefreshTokenCanBe()
  @HttpCode(StatusCodes.OK)
  @Post('refresh')
  refresh(@Body() updateTokenDTO: UpdateTokenDTO) {
    return this.authService.refresh(updateTokenDTO);
  }
}
