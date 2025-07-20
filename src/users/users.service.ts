import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole, UsersDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOneBy({ email });
  }

  async createUser(body: UsersDto): Promise<User>  {
    const {password, email, role = UserRole.viewer} = body;
    const hashed: string = await bcrypt.hash(password, 10);
    //encrypting the password and saving it
    const user: User = this.repo.create({ email, password: hashed, role });
    return this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }
}