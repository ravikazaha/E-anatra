import { DynamicModule, Module, Type } from '@nestjs/common';
import { IsUniqueValidator } from './is-unique.validator';
import { UserRepository } from 'src/users/application/ports/user.repository';

@Module({
  providers: [
    IsUniqueValidator,
    { provide: UserRepository, useExisting: UserRepository },
  ],
  exports: [IsUniqueValidator],
})
export class ValidatorsModule {
  static withUserRepository(userModule: Type | DynamicModule): DynamicModule {
    return {
      module: ValidatorsModule,
      imports: [userModule],
    };
  }
}
