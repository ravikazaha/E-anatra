import { Module } from '@nestjs/common';
import { OrmUserPersistenceModule } from './persistence/orm/orm-user-persistence.module';
import { InMemoryUserPersistenceModule } from './persistence/in-memory/in-memory-user-persistence.module';

@Module({})
export class UserInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistenceModule =
      driver === 'orm'
        ? OrmUserPersistenceModule
        : InMemoryUserPersistenceModule;
    return {
      module: UserInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
