import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
  }

  async register(user: Partial<User>): Promise<User | Error> {
    try {
      return await this.userRepo.save(user);
    } catch (e) {
      return e;
    }
  }
}
