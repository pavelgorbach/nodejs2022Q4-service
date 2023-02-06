import { v4 as uuid } from 'uuid';

export class Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number,
  ) {
    this.id = uuid();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }

  public update(data: Partial<Track>) {
    this.name = data.name || this.name;
    this.artistId = data.artistId || this.artistId;
    this.albumId = data.albumId || this.albumId;
    this.duration = data.duration || this.duration;
  }
}
