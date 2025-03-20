import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from 'src/common/validators/match.validator';
import { IsUnique } from 'src/common/validators/is-unique.validator';

export class SignUpDto {
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsUnique('username')
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsUnique('email')
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;

  @IsNotEmpty()
  @IsBoolean()
  isAccepted: boolean;
}
