import { DynamicModule, Module, Type } from '@nestjs/common';
import { UsersController } from '../presenters/http/users.controller';
import { UsersService } from './users.service';
import { UserBuilderImpl } from '../domain/factories/user.builderImpl';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserBuilderImpl],
})
export class UsersModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return { module: UsersModule, imports: [infrastructureModule] };
  }
}
