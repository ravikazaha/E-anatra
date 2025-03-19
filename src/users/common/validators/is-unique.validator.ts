import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { UsersService } from 'src/users/application/users.service';
import { User } from 'src/users/domain/user';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueValidator implements ValidatorConstraintInterface {
  constructor(
    private readonly userService: UsersService,
    private readonly userRepository: UserRepository,
  ) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const [field] = validationArguments.constraints;
    let exists: User | null = null;
    console.log(this.userRepository);
    console.log('[UserService]', this.userService);
    if (field === 'username') {
      exists = await this.userRepository.findByUsername(value);
    } else if (field === 'email') {
      exists = await this.userRepository.findByEmail(value);
    }

    return !exists;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const [field] = validationArguments.constraints;
    return `${field} already exists`;
  }
}
