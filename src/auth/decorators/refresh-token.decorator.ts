import { SetMetadata } from '@nestjs/common';

export const RefreshTokenCanBe = () => SetMetadata('refreshToken', true);
