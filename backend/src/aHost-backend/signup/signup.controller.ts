import { CreateHostDto } from 'src/aHost-backend/dto/createHost.dto';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { HostSignupService } from './signup.service';

@Controller('api/host/signup')
export class HostSignupController {
  constructor(private hostSignupService: HostSignupService) {}
  @Post()
  async create(@Body() createHostDto: CreateHostDto) {
    try {
      const res = await this.hostSignupService.signup(createHostDto);
      return {
        message: 'Host successfully signed-up',
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
        console.log("dontknow")
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
