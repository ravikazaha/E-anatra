import { randomUUID } from 'crypto';
import { User } from '../user';
import { UserBuilder } from './user.builder';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserBuilderImpl extends UserBuilder {
  private firstName: string;
  private lastName: string;
  private userId: string;

  private user: User;

  constructor(
    private username: string,
    private email: string,
    private password: string,
  ) {
    super();
    this.userId = randomUUID();
  }

  withFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  withLastName(lastName: string): void {
    this.lastName = lastName;
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
