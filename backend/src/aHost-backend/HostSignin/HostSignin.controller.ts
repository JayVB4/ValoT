import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SigninHostDto } from '../../aHost-backend/dto/signinHost.dto'; // DTO for host sign-in
import { HostSigninService } from './HostSignin.service'; // Service for host sign-in

@Controller('host') // Endpoint for host sign-in
export class HostSigninController {
  constructor(private signinHostService: HostSigninService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signinHostDto: SigninHostDto) {
    try {
      const res = await this.signinHostService.signIn(signinHostDto);
      return {
        message: 'Host successfully signed in',
        error: false,
        data: res,
      };
    } catch (error) {
      if (error) {
        if (error.status === 404) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: true,
              message: 'Host with given email does not exist',
            },
            HttpStatus.NOT_FOUND,
          );
        }
        if (error.status === 401) {
          throw new HttpException(
            {
              status: HttpStatus.UNAUTHORIZED,
              message: 'Incorrect sign-in details provided',
              error: true,
            },
            HttpStatus.UNAUTHORIZED,
          );
        }
        // For other cases
        throw error;
      }
      // If error has a different structure
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: true,
          message: 'Something went wrong, please try again later.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
