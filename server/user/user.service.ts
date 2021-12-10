import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUser } from '../interfaces/create-user-interface';
import { User } from '../entitys/user.entity';
import { List } from '../entitys/list.entity';
import { Repository } from 'typeorm';
import { IUser } from '../interfaces/user-interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    @InjectRepository(User) private listRepository: Repository<List>
  ) {
  }

  async registration(user: ICreateUser) {
    const { login, password, repPassword } = user;

    try {
      if(password !== repPassword){
        throw 'error';
      }

      const passwordHash = password + 'A';

      const newUser = await this.userRepository.save({
        login,
        password: passwordHash
      });

      const jwt = this.getJWT({ id: newUser.id, login: newUser.login });

      return { jwt }
    } catch (e) {
      return { err: e };
    }
  }

  async login(user: IUser) {
    const { login, password } = user;

    try {
      const accurateUser = await this.userRepository.findOne({ where:
          { login }
      });

      if(accurateUser === undefined){
        throw 'no user';
      }

      const isPasswordCorrect = (password + 'A') === accurateUser.password;
      if (isPasswordCorrect) {
        const jwt = this.getJWT({ id: accurateUser.id, login: accurateUser.login });
        return { jwt }
      }

      throw 'error';
    } catch (e) {
      return { err: e };
    }
  }

  async settings(user: { login: any }) {
    try {
      const { login } = user;
      const accurateUser = await this.userRepository.findOne({ where:
          { login }
      });

      if(accurateUser === undefined){
        throw 'no user';
      }

      return {
        user: {
          login: accurateUser.login
        }
      }
    } catch (e) {
      return { err: e };
    }

  }

  getJWT(payload = {}) {
    return this.jwtService.sign(payload);
  }
}
