import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from './commands/create-user.command';

@Injectable()
export class UsersService {
  create(createUserCommand: CreateUserCommand) {}
}
