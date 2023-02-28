import { IsString } from 'class-validator';

export class UpdateTokenDTO {
  @IsString()
  refreshToken: string;
}
