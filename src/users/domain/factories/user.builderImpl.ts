import { randomUUID } from 'crypto';
import { User } from '../user';
import { UserBuilder } from './user.builder';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserBuilderImpl implements UserBuilder {
  private firstName: string;
  private lastName: string;
  private userId: string;
  private username: string;
  private email: string;
  private password: string;

  private user: User;

  setUser(username: string, email: string, password: string): UserBuilder {
    this.userId = randomUUID();
    this.username = username;
    this.email = email;
    this.password = password;

    return this;
  }

  withFirstName(firstName: string): UserBuilder {
    this.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): UserBuilder {
    this.lastName = lastName;
    return this;
  }

  build(): User {
    this.user = new User(
      this.userId,
      this.firstName,
      this.lastName,
      this.username,
      this.email,
      this.password,
    );

    return this.user;
  }
}
