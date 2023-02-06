import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export class User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;

    this.id = uuidv4();
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  update(data: Partial<User>) {
    this.login = data.login || this.login;
    this.password = data.password || this.password;

    this.version += 1;
    this.updatedAt = Date.now();
  }
}
