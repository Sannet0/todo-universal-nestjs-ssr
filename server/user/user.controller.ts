import { Body, Controller, ExecutionContext, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/creating-user.dto';
import { UserDto } from './dto/user.dto';
import * as jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('registration')
  registration(@Body() dto: CreateUserDto){
    return this.userService.registration(dto);
  }

  @Post('login')
  login(@Body() dto: UserDto){
    return this.userService.login(dto);
  }


  @Get('settings')
  settings(@Req() req: any){
    const authHeader = req.headers.authorization.split(' ');
    const token = authHeader[1];
    let user = {
          login: ''
    };

    jwt.verify(token, 'SECRET', (err: any, payload: any) => {
      if(err){
        return false
      }

      user = {
        login: payload.login
      }

      return true
    });

    return this.userService.settings(user)
  }
}
