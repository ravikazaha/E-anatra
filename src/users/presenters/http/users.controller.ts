import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserCommand } from 'src/users/application/commands/create-user.command';
import { UsersService } from 'src/users/application/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(
      new CreateUserCommand(
        createUserDto.username,
        createUserDto.email,
        createUserDto.password,
      ),
    );
  }
}
