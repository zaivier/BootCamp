import 'reflect-metadata';
import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppErro';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able to Authenticate', async () => {
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

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticated = await authenticateUser.execute({
      email: 'athuskz@gmail.com',
      password: 'hakunaMatata',
    });

    expect(authenticated).toHaveProperty('token');
  });
  it('should not be able to Authenticate with wrong password', async () => {
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

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    // const authenticated = await authenticateUser.execute({
    //   email: 'athuskz@gmail.com',
    //   password: 'elindodizer',
    // });

    expect(
      authenticateUser.execute({
        email: 'athuskz@gmail.com',
        password: 'elindodizera',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to Authenticate with none existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'aathuskz@gmail.com',
        password: 'hakunaMatata',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
