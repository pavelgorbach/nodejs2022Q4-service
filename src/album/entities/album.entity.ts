import { v4 as uuid } from 'uuid';

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(name: string, year: number, artistId: string | null) {
    this.id = uuid();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  public update(data: Partial<Album>) {
    this.name = data.name || this.name;
    this.year = data.year || this.year;
    this.artistId = data.artistId || this.artistId;
  }
}
