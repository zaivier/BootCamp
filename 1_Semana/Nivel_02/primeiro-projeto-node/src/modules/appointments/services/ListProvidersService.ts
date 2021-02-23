import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepoisotiry';
import AppError from '@shared/errors/AppErro';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[] | undefined> {
    const user = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });
    if (!user) {
      throw new AppError('User not found.');
    }
    return user;
  }
}
