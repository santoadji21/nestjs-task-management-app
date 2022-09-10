import { CreateAuthDto } from './../dto/create-auth.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/auth.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByUsername(username: string): Promise<User> {
    return this.findOne({ username });
  }

  async createUser(createAuthDto: CreateAuthDto): Promise<void> {
    const user = new User();
    user.username = createAuthDto.username;
    user.password = createAuthDto.password;

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAll(): Promise<User[]> {
    return this.find();
  }
}
