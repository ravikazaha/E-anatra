import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueValidator } from '../common/validators/is-unique.validator';

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
