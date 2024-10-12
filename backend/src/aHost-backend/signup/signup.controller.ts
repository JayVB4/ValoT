import { CreateHostDto } from '../../aHost-backend/dto/createHost.dto';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { HostSignupService } from './signup.service';

@Controller('host')
export class HostSignupController {
  constructor(private hostSignupService: HostSignupService) {}
  @Post('signup')
  async create(@Body() createHostDto: CreateHostDto) {
    try {
      console.log('aa', createHostDto);
      const res = await this.hostSignupService.signup(createHostDto);
      return {
        message: 'Host successfully signed-up',
        error: false,
        data: res,
      };
    } catch (error) {
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
