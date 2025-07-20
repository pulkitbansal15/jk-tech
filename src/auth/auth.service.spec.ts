import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user credentials', async () => {
    const password = '123456';
    const hashed = await bcrypt.hash(password, 10);
  
    const mockUser: User = {
      id: 1,
      email: 'test@test.com',
      password: hashed,
      role: 'viewer',
    };
  
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
  
    const user = await service.validate('test@test.com', password);
    expect(user).toEqual(mockUser);
  });
  

  it('should return token on login', async () => {
    const user = { id: 1, email: 'user@test.com', role: 'editor' };
    const token = await service.login(user);
    expect(token).toEqual({ access_token: 'token' });
  });
});