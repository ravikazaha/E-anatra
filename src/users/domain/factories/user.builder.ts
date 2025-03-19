import { User } from '../user';

export abstract class UserBuilder {
  abstract setUser(
    username: string,
    email: string,
    password: string,
  ): UserBuilder;

  abstract withFirstName(firstName: string): UserBuilder;
  abstract withLastName(lastName: string): UserBuilder;

  abstract build(): User;
}
