import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from 'src/users/application/ports/user.repository';

@ValidatorConstraint({ name: 'isUnique', async: true })
@Injectable()
export class IsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const [field] = validationArguments.constraints;

    const exists = await this.userRepository.findOneBy({ [field]: value });

    return !exists;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} "${validationArguments.value}" already exists`;
  }
}

export function IsUnique(field: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [field],
      options: validationOptions,
      validator: IsUniqueValidator,
    });
  };
}
