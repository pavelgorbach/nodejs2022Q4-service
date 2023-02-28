import { SetMetadata } from '@nestjs/common';

export const WithoutAuth = () => SetMetadata('withoutAuth', true);
