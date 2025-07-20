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
    const mockRepo: jest.Mocked<Partial<Repository<User>>> = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(), 
      delete: jest.fn(),
    };
  
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepo, // ✅ inject mock, not actual class
        },
      ],
    }).compile();
  
    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
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
    const mockUser = { id: 1, email: 'test@example.com' } as User;
    (repo.findOneBy as jest.Mock).mockResolvedValue(mockUser); // ✅
  
    const result = await service.findByEmail('test@example.com');
    expect(repo.findOneBy).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(result).toEqual(mockUser);
  });

  it('should return all users', async () => {
    const findAllSpy = jest.spyOn(repo, 'find').mockResolvedValue([]);
    const users = await service.findAll();
    expect(users).toEqual([]);
    expect(findAllSpy).toHaveBeenCalled();
  });
});