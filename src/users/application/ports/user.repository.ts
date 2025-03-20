import { User } from 'src/users/domain/user';

export interface UserFieldName {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
  abstract save(user: User): Promise<User>;
  abstract findById(userId: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findByUsername(username: string): Promise<User>;
  abstract findOneBy(fieldName: Partial<UserFieldName>): Promise<User>;
}
