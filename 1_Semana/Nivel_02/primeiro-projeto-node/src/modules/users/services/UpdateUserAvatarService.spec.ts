import 'reflect-metadata';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppErro';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';
import FakeStorageProvider from '../providers/StorageProviders/fakes/FakeStorageProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeStorageProvider: FakeStorageProvider;
let updateUser: UpdateUserAvatarService;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeStorageProvider = new FakeStorageProvider();
    updateUser = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update the User Avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Athus',
      email: 'fulano@example.com',
      password: 'hakunaMatata',
    });

    const updateAvatarUser = await updateUser.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(updateAvatarUser.avatar).toBe('avatar.jpg');
  });
  it('should not be able to update the User Avatar from none existing user', async () => {
    expect(
      updateUser.execute({
        user_id: 'quistoNoExiste',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be delete old avatar and update to new one', async () => {
    // O jest verifica se a função deleteFile foi disparada.
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Athus',
      email: 'fulano@example.com',
      password: 'hakunaMatata',
    });

    await updateUser.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    const updateAvatarUser = await updateUser.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(updateAvatarUser.avatar).toBe('avatar2.jpg');
  });
});
