import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../dto/createUser.dto';

@Injectable()
export class SignupService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.create(createUserDto);

    const payload = { userEmail: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      username: user.username,
    };
  }
} 
