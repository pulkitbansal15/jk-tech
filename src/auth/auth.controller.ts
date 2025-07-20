import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersDto } from '../users/users.dto';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('register')
  register(@Body(new ValidationPipe()) body: UsersDto) {
    //create users with different roles
    return this.usersService.createUser(body);
}

  @Post('login')
  async login(@Body(new ValidationPipe()) body: UsersDto) {
    //login a particular user by providing a jwt token
    //for now the token has no expiry time
    const user: User = await this.authService.validate(body?.email, body?.password);
    return this.authService.login(user);
  }
}