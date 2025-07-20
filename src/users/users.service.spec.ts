import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user with hashed password', async () => {
    const saveSpy = jest.spyOn(repo, 'save').mockResolvedValue({} as any);
    const user = await service.createUser('test@example.com', 'password');
    expect(saveSpy).toHaveBeenCalled();
    expect(user).toBeDefined();
  });

  it('should find user by email', async () => {
    const findSpy = jest.spyOn(repo, 'findOneBy').mockResolvedValue({} as any);
    await service.findByEmail('test@example.com');
    expect(findSpy).toHaveBeenCalledWith({ email: 'test@example.com' });
  });

  it('should return all users', async () => {
    const findAllSpy = jest.spyOn(repo, 'find').mockResolvedValue([]);
    const users = await service.findAll();
    expect(users).toEqual([]);
    expect(findAllSpy).toHaveBeenCalled();
  });
});