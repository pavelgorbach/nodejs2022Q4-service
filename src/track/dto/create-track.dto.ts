import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @ValidateIf((_, artistId) => !!artistId)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  artistId: string | null;
  @ValidateIf((_, albumId) => !!albumId)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  albumId: string | null;
  @IsInt()
  @IsNotEmpty()
  duration: number;
}
