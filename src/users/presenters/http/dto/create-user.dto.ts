import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsUnique } from 'src/common/validators/is-unique.validator';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsUnique('username')
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUnique('email')
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
