import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getRepository } from 'typeorm';
import { User } from '../users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepo = getRepository(User),
    private jwtService: JwtService
  ) {
  }

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user: User = await this.userRepo.findOne({ email });
    console.log('service', user);
    console.log('service', password);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async login(user: Partial<User>): Promise<any> {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
