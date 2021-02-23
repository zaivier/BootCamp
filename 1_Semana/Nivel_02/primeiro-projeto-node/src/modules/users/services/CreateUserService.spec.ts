import 'reflect-metadata';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppErro';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new User', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Athus',
      email: 'athuskz@gmail.com',
      password: 'hakunaMatata',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const RepetEmail = 'athuskz@gmail.com';

    await createUser.execute({
      name: 'Athus',
      email: RepetEmail,
      password: 'hakunaMatata',
    });

    expect(
      createUser.execute({
        name: 'Athus',
        email: RepetEmail,
        password: 'hakunaMatata',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
