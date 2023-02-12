import { Module } from '@nestjs/common';

import { Db } from '../db/db';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [Db, UserService],
})
export class UserModule {}
