import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../models/users/users.service';
import { JwtService } from '@nestjs/jwt';

import type { User } from 'src/models/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userEmail: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(userEmail);

    const isMatch = await bcrypt.compare(pass, user?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const { id, firstName, lastName, email, isActive } = user;

    const payload = {
      id,
      username: email,
      firstName,
      lastName,
      email,
      isActive,
    };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(user: User): Promise<any> {
    const userAlreadyExist = await this.usersService.findOneByEmail(user.email);
    if (userAlreadyExist) {
      throw new UnauthorizedException();
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);

    user.password = hash;

    const newUser = await this.usersService.create(user);

    const { id, firstName, lastName, email, isActive } = newUser;

    const payload = {
      id,
      username: email,
      firstName,
      lastName,
      email,
      isActive,
    };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}