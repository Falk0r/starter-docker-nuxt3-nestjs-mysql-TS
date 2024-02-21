import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
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

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logOut() {
    return { status: 'disconnect' };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('session')
  async getSession() {
    return { status: 'authenticated!' };
  }
}
