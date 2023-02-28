import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Entity,
  ManyToOne,
} from 'typeorm';

import { Album } from './../../album/entities/album.entity';
import { Track } from './../../track/entities/track.entity';
import { Fav } from './../../favs/entities/fav.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  @ManyToOne(() => Fav, (favorites) => favorites.artists)
  favorites: Fav;
}
