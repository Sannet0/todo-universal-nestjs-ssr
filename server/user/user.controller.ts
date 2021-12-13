import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/creating-user.dto';
import { UserDto } from './dto/user.dto';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('registration')
  registration(@Body() dto: CreateUserDto): Promise<{ jwt: string }> {
    return this.userService.registration(dto);
  }

  @Post('login')
  login(@Body() dto: UserDto): Promise<{ jwt: string }> {
    return this.userService.login(dto);
  }

  @UseGuards(JwtGuard)
  @Get('settings')
  settings(@Req() req: any): Promise<{ user: { login: string } }> {
    return this.userService.settings(req.user.login);
  }
}
