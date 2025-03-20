import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './commands/create-user.command';
import { UserBuilderImpl } from '../domain/factories/user.builderImpl';
import { UserRepository } from './ports/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userBuilder: UserBuilderImpl,
    private readonly userRepository: UserRepository,
  ) {}
  create(createUserCommand: CreateUserCommand) {
    const user = this.userBuilder
      .setUser(
        createUserCommand.username,
        createUserCommand.email,
        createUserCommand.password,
      )
      .withFirstName(createUserCommand.firstName)
      .withLastName(createUserCommand.lastName)
      .build();

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.findAll();
  }
}
