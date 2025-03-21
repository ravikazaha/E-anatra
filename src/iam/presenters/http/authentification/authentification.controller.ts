import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthentificationService } from 'src/iam/applications/authentification/authentification.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignUpCommand } from 'src/iam/applications/authentification/commands/sign-up.command';
import { SignInDto } from '../dto/sign-in.dto';
import { SignInCommand } from 'src/iam/applications/authentification/commands/sign-in.command';
import { Auth } from 'src/iam/applications/authentification/decorators/auth.decorator';
import { AuthType } from 'src/iam/applications/authentification/enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('authentification')
export class AuthentificationController {
  constructor(
    private readonly authentificationService: AuthentificationService,
  ) {}

  @Post('sign-up')
  signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.authentificationService.signUp(
      new SignUpCommand(
        signUpDto.firstName.trim() ?? null,
        signUpDto.lastName.trim() ?? null,
        signUpDto.username,
        signUpDto.email,
        signUpDto.password,
      ),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.authentificationService.signIn(
      new SignInCommand(signInDto.email, signInDto.password),
    );
  }
}
