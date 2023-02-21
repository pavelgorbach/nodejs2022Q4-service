import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  @IsNotEmpty()
  year: number;
  @ValidateIf((_, artistId) => !!artistId)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  artistId: string | null;
}
