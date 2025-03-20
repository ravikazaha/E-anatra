import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'match', async: false })
@Injectable()
export class MatchValidator implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean {
    const [propertyToMatch] = validationArguments.constraints;
    const relatedValue = (validationArguments.object as any)[propertyToMatch];
    return value === relatedValue;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must match ${validationArguments.constraints[0]}`;
  }
}

export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchValidator,
    });
  };
}
