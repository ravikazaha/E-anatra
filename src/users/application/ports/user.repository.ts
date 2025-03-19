import { User } from 'src/users/domain/user';

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
  abstract save(user: User): Promise<User>;
  abstract findById(userId: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findByUsername(username: string): Promise<User>;
}
