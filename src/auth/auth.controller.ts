import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ActiveUser } from '../common/decorators/active-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiConflictResponse({
    description: 'User already exists',
  })
  @ApiBadRequestResponse({
    description: 'Return errors for invalid sign up fields',
  })
  @ApiCreatedResponse({
    description: 'User has been successfully signed up',
  })
  @ApiBearerAuth()
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @ApiBadRequestResponse({
    description: 'Return errors for invalid sign in fields',
  })
  @ApiOkResponse({ description: 'User has been successfully signed in' })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }

  @ApiOkResponse({ description: 'Refresh old access token!' })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Get('refresh')
  refresh(@Headers('authorization') token) {
    return this.authService.refresh(token.split(' ')[1]);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: 'User has been successfully signed out' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('sign-out')
  signOut(@Headers('authorization') token): Promise<void> {
    return this.authService.signOut(token.split(' ')[1]);
  }
}
