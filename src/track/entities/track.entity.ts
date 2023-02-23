import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Artist } from './../../artist/entities/artist.entity';
import { Album } from './../../album/entities/album.entity';
import { Fav } from './../../favs/entities/fav.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  album: Album;

  @ManyToOne(() => Fav, (favorites) => favorites.tracks)
  favorites: Fav;
}
