import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../models/users/users.module';
import { UsersService } from 'src/models/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}