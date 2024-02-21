import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { User } from './models/users/entities/user.entity';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './authentication/auth.module';
import { AuthGuard } from './authentication/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/mysql/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
