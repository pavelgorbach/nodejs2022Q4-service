import { Exclude, Transform } from 'class-transformer';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @VersionColumn()
  version: number;

  @Transform(({ value }) => new Date(value).getTime())
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Transform(({ value }) => new Date(value).getTime())
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  @Exclude()
  password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}
