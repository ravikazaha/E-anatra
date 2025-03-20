import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserCommand } from 'src/users/application/commands/create-user.command';
import { UsersService } from 'src/users/application/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(
      new CreateUserCommand(
        createUserDto.firstName.trim(),
        createUserDto.lastName.trim(),
        createUserDto.username,
        createUserDto.email,
        createUserDto.password,
      ),
    );
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
