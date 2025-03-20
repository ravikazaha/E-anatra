import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/application/users.module';
import { CoreModule } from './core/core.module';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-option.interface';
import { UserInfrastructureModule } from './users/infrastructures/user-infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
  ],
})
export class AppModule {
  static register(option: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(option),
        UsersModule.withInfrastructure(
          UserInfrastructureModule.use(option.driver),
        ),
      ],
    };
  }
}
