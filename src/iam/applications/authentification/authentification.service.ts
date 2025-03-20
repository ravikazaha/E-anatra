import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { HashingService } from '../hashing/hashing.service';
import { SignUpCommand } from './commands/sign-up.command';
import { UserBuilder } from 'src/users/domain/factories/user.builder';
import { SignInCommand } from './commands/sign-in.command';

@Injectable()
export class AuthentificationService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly userBuilder: UserBuilder,
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

      return true;
    } catch (error) {
      throw error;
    }
  }
}
