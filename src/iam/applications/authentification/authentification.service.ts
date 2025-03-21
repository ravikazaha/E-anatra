import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { HashingService } from '../hashing/hashing.service';
import { SignUpCommand } from './commands/sign-up.command';
import { UserBuilder } from 'src/users/domain/factories/user.builder';
import { SignInCommand } from './commands/sign-in.command';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthentificationService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly userBuilder: UserBuilder,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpCommand: SignUpCommand) {
    try {
      const password = await this.hashingService.hash(signUpCommand.password);

      const user = this.userBuilder
        .setUser(signUpCommand.username, signUpCommand.email, password)
        .withFirstName(signUpCommand.firstName)
        .withLastName(signUpCommand.lastName)
        .build();

      return this.usersRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async signIn(signInCommand: SignInCommand) {
    try {
      const user = await this.usersRepository.findOneBy({
        email: signInCommand.email,
      });

      if (!user) throw new UnauthorizedException('Credential Error');

      const isEqual = await this.hashingService.compare(
        signInCommand.password,
        user.password,
      );

      if (!isEqual) throw new UnauthorizedException('Credential Error');

      const accessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.accessTokenTtl,
        },
      );

      return { accessToken };
    } catch (error) {
      throw error;
    }
  }
}
