import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from '../dto/signinUser.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class SigninService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signinUserDto: SigninUserDto): Promise<any> {
    const user = await this.userService.findUserByEmail(signinUserDto.email);
    
    // Check if user exists
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify the password using bcrypt
    const isPasswordValid = await compare(signinUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create payload and return the access token
    const payload = { userEmail: user.email, sub: user.id }; // Use user.id for the subject
    return {
      access_token: await this.jwtService.signAsync(payload),
      username: user.username,
    };
  }
}
