import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUsersRepository from '@modules/users/repositories/IUsersRepoisotiry';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = await this.ormRepository.create({
      user_id,
    });
    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
