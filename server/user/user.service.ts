import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';
import { Repository } from 'typeorm';
import * as passwordHash from 'password-hash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async registration(user: { login: string; password: string; repPassword: string }): Promise<{ jwt: string }> {
    const { login, password, repPassword } = user;
    try {
      if (password !== repPassword){
        throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
      }

      const hash = passwordHash.generate(password);

      const newUser = await this.userRepository.save({
        login,
        password: hash
      });

      const jwt = this.getJWT({ id: newUser.id, login: newUser.login });

      return { jwt };
    } catch (err) {
      return err;
    }
  }

  async login(user: { login: string; password: string }): Promise<{ jwt: string }> {
    const { login, password } = user;

    try {
      const accurateUser = await this.userRepository.findOne({ where:
          { login }
      });

      if (accurateUser === undefined){
        throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
      }

      const isPasswordCorrect = passwordHash.verify(password, accurateUser.password);

      if (isPasswordCorrect) {
        const jwt = this.getJWT({ id: accurateUser.id, login: accurateUser.login });
        return { jwt };
      }

      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    } catch (err) {
      return err;
    }
  }

  async settings(login: string): Promise<{ user: { login: string } }> {
    try {
      const accurateUser = await this.userRepository.findOne({ where:
          { login }
      });

      if (accurateUser === undefined){
        throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
      }

      return {
        user: {
          login: accurateUser.login
        }
      };
    } catch (err) {
      return err;
    }

  }

  getJWT(payload = {}) {
    return this.jwtService.sign(payload);
  }
}
