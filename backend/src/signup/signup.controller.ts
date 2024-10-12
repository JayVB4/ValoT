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
      console.log('error', error.code ,error);
      if (error) {
        if (error.code === 11000 || error.code == 'P2002') {
          var msg = 'Unknown error occured'
          if(error.meta.target == 'email'){
            msg = 'Email already exists. Please use a different email'
          }
          else if(error.meta.target == 'username'){
            msg = 'Username already exists. Please use a different Username'
          }
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: true,
              message: msg,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      } 
      else {
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
