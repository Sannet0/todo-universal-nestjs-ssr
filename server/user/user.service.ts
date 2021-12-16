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

  async registration(user: { login: string; password: string; repPassword: string }): Promise<{ jwt: string; rt: string }> {
    const { login, password, repPassword } = user;
    try {
      if (password !== repPassword){
        throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
      }

      const hash = passwordHash.generate(password);

      const createdUsers: User[] = await this.userRepository.query(`
        INSERT INTO Users ("login", "password") 
        VALUES ('${ login }', '${ hash }') 
        RETURNING id, "login"
      `);
      const newUser: User = createdUsers[0];

      if (newUser === undefined) {
        throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
      }

      const payload = { id: newUser.id, login: newUser.login };
      return {
        jwt: this.jwtService.sign(payload),
        rt: this.jwtService.sign(payload, { expiresIn: '24h' })
      };
    } catch (err) {
      return err;
    }
  }

  async login(user: { login: string; password: string }): Promise<{ jwt: string; rt: string }> {
    const { login, password } = user;
    try {
      const accurateUser = await this.findUserByLogin(login);

      if (accurateUser === undefined){
        throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
      }

      const isPasswordCorrect = passwordHash.verify(password, accurateUser.password);

      if (isPasswordCorrect) {
        const payload = { id: accurateUser.id, login: accurateUser.login };
        return {
          jwt: this.jwtService.sign(payload),
          rt: this.jwtService.sign(payload, { expiresIn: '24h' })
        };
      }

      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    } catch (err) {
      return err;
    }
  }

  async settings(login: string): Promise<{ user: { login: string } }> {
    try {
      const accurateUser = await this.findUserByLogin(login);

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

  async findUserByLogin(login: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.query(`
        SELECT * FROM Users
        WHERE "login" = '${ login }'
      `);
      return user[0];
    } catch (err) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
