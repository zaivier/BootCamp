import 'reflect-metadata';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppErro';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';
import FakeStorageProvider from '../providers/StorageProviders/fakes/FakeStorageProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Athus',
      email: 'fulano@example.com',
      password: 'hakunaMatata',
    });

    const UpdatedProfile = await updateProfile.execute({
      user_id: user.id,
      name: 'Athus Azevedo',
      email: 'athus.azevedo@kkmail.com.br',
    });

    expect(UpdatedProfile.name).toBe('Athus Azevedo');
    expect(UpdatedProfile.email).toBe('athus.azevedo@kkmail.com.br');
  });
  it('should not be able to update the profile from a non-existing user', async () => {
    // const user = await fakeUsersRepository.create({
    //   name: 'Athus',
    //   email: 'fulano@example.com',
    //   password: 'hakunaMatata',
    // });

    const UpdatedProfile = await expect(
      updateProfile.execute({
        user_id: 'User Non Exciste!',
        name: 'Athus Azevedo',
        email: 'athus.azevedo@kkmail.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to change the e-mail to another user e-mail.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Athus',
      email: 'fulano@example.com',
      password: 'hakunaMatata',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Athus',
      email: 'fulano2@example.com',
      password: 'hakunaMatata',
    });
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Athus Azevedo',
        email: 'fulano2@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Athus',
      email: 'fulano@example.com',
      password: 'hakunaMatata',
    });

    const UpdatedProfile = await updateProfile.execute({
      user_id: user.id,
      name: 'Athus Azevedo',
      email: 'athus.azevedo@kkmail.com.br',
      password: '123123',
      old_password: 'hakunaMatata',
    });

    expect(UpdatedProfile.password).toBe('123123');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Athus',
      email: 'fulano@example.com',
      password: 'hakunaMatata',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Athus Azevedo',
        email: 'athus.azevedo@kkmail.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Athus',
      email: 'fulano@example.com',
      password: 'hakunaMatata',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Athus Azevedo',
        email: 'athus.azevedo@kkmail.com.br',
        password: '123123',
        old_password: 'wrong',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
