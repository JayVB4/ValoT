import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { SignupService } from './signup.service';

@Controller('api')
export class SignupController {
  constructor(private signupService: SignupService) {}
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      console.log('Received signup request with data:', createUserDto);
      const res = await this.signupService.signup(createUserDto);
      return {
        message: 'User successfully signed-up',
        error: false,
        data: res,
      };
    } catch (error) {
      if (error && error.errorResponse) {
        if (error.code === 11000) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: true,
              message: 'Email already exists. Please use a different email',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        console.log('error', error);
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
}
