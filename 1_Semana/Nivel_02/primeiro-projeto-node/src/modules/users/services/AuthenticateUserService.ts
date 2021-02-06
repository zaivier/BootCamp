import { compare } from 'bcryptjs';
import AppError from '@shared/errors/AppErro';
import auth from '@config/auth';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepoisotiry';
import IHashProvider from '../providers/HashProviders/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}
@injectable()
export default class AutenticateUserService {
  constructor(
    @inject('UsersRepository')
    @inject('HashProvider')
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect e-mail/password combinations', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      user.password,
      password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect e-mail/password combinations', 401);
    }

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
