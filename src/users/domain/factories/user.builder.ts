import { User } from '../user';

export abstract class UserBuilder {
  abstract withFirstName(firstName: string): void;
  abstract withLastName(lastName: string): void;
  abstract build(): User;
}
