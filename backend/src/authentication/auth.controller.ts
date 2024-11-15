import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { User } from 'src/models/users/entities/user.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Public } from 'src/common/decorators/metadata/isPublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() newUser: User) {
    if (
      !newUser.password ||
      !newUser.email ||
      !newUser.firstName ||
      !newUser.lastName
    ) {
      throw new HttpException(
        'register.invalid.allFieldsRequired',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.authService.signUp(newUser);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logOut() {
    return { status: 'disconnect' };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('session')
  async getSession(@Request() req) {
    return {
      status: 'authenticated!',
      user: req.user,
    };
  }
}
