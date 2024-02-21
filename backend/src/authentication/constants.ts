import { ConfigService } from '@nestjs/config';

export const jwtConstants = new ConfigService().get<string>('SECRET_HASH');