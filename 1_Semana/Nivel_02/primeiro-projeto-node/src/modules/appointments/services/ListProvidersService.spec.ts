import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listproviders: ListProvidersService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listproviders = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Athus',
      email: 'fulano@example.com',
      password: 'hakunaMatata',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'Athus 2',
      email: 'fulano@example.com',
      password: 'hakunaMatata',
    });
    const userLogado = await fakeUsersRepository.create({
      name: 'Athus 4',
      email: 'fulano@example.com',
      password: 'hakunaMatata',
    });

    const providers = await listproviders.execute({ user_id: userLogado.id });

    expect(providers).toEqual([user1, user2]);
  });
});
