import 'reflect-metadata';
import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppErro';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to Authenticate', async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'Athus',
      email: 'athuskz@gmail.com',
      password: 'hakunaMatata',
    });

    const authenticateUser = new AuthenticateUserService(
      fakeHashProvider,
      fakeUsersRepository,
    );

    const authenticated = await authenticateUser.execute({
      email: 'athuskz@gmail.com',
      password: 'hakunaMatata',
    });

    expect(authenticated).toHaveProperty('token');
  });
  it('should not be able to Authenticate with wrong password', async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'Athus',
      email: 'athuskz@gmail.com',
      password: 'hakunaMatata',
    });

    const authenticateUser = new AuthenticateUserService(
      fakeHashProvider,
      fakeUsersRepository,
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
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeHashProvider,
      fakeUsersRepository,
    );

    expect(
      authenticateUser.execute({
        email: 'aathuskz@gmail.com',
        password: 'hakunaMatata',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
