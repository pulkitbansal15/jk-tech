import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async createUser(email: string, password: string, role: 'admin' | 'editor' | 'viewer' = 'viewer') {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.repo.create({ email, password: hashed, role }); // Type error if role is inferred as string
    return this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }
}