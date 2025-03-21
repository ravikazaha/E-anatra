import { DynamicModule, Module, Type } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthentificationController } from '../presenters/http/authentification/authentification.controller';
import { MatchValidator } from 'src/common/validators/match.validator';
import { AuthentificationService } from './authentification/authentification.service';
import { IsUniqueValidator } from 'src/common/validators/is-unique.validator';
import { UserBuilder } from 'src/users/domain/factories/user.builder';
import { UserBuilderImpl } from 'src/users/domain/factories/user.builderImpl';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    AuthentificationService,
    MatchValidator,
    IsUniqueValidator,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: UserBuilder,
      useClass: UserBuilderImpl,
    },
  ],
  controllers: [AuthentificationController],
})
export class IamModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: IamModule,
      imports: [infrastructureModule],
    };
  }
}
