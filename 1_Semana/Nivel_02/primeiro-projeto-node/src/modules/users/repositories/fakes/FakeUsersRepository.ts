import { uuid } from 'uuidv4';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepoisotiry';

class UserRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(f => f.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(f => f.email === email);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const createUser = new User();
    createUser.id = uuid();
    createUser.name = name;
    createUser.email = email;
    createUser.password = password;

    this.users.push(createUser);
    return createUser;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(f => f.id === user.id);
    this.users[findIndex] = user;
    return user;
  }
}

export default UserRepository;
