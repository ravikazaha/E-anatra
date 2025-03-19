import { Module } from '@nestjs/common';
import { UsersController } from '../presenters/http/users.controller';
import { UsersService } from './users.service';
import { UserBuilderImpl } from '../domain/factories/user.builderImpl';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserBuilderImpl],
})
export class UsersModule {}
