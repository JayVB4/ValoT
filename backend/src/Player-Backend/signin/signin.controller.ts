import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SigninUserDto } from '../dto/signinUser.dto';
import { SigninService } from './signin.service';

@Controller('api')
export class SigninController {
  constructor(private signinService: SigninService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async findUser(@Body() signinUserDto: SigninUserDto) {
    try {
      console.log('Received signin request with data:', signinUserDto);
      const res = await this.signinService.signIn(signinUserDto);
      return {
        message: 'User successfully signed in',
        error: false,
        data: res,
      };
    } catch (error) {
      if (error) {
        console.log(error)
        if (error.status === 404) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: true,
              message: 'User with given email does not exist',
            },
            HttpStatus.NOT_FOUND,
          );
        }
        if (error.status === 401) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: 'Incorrect sign-in details provided',
              error: true,
            },
            HttpStatus.NOT_FOUND,
          );
        }
        // for other cases
        throw error;
      }
      // if error has a different structure
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
