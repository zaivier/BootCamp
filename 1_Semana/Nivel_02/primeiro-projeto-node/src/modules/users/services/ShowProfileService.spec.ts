import 'reflect-metadata';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppErro';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to search the user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Athus',
      email: 'fulano@example.com',
      password: 'hakunaMatata',
    });

    const showUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(showUser).toHaveProperty('id');
  });
  it('should not be able to search an non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'Not Existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
