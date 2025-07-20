import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('register')
  register(@Body() body: { email: string; password: string; role?: string }) {
    return this.usersService.createUser(body.email, body.password, body.role as 'viewer' | 'admin' | 'editor' | undefined);
}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validate(body.email, body.password);
    return this.authService.login(user);
  }
}