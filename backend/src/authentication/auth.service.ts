import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../models/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userEmail: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(userEmail);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // const { password, ...result } = user;
    const payload = { sub: user.id, username: user.email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
