import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninHostDto } from 'src/aHost-backend/dto/signinHost.dto'; // Ensure this DTO is created
import { HostService } from 'src/aHost-backend/host/host.service'; // Service for managing hosts

@Injectable()
export class HostSigninService {

  constructor(
    private hostService: HostService, // Host service to interact with host data
    private jwtService: JwtService, // JWT service for token generation
  ) {}

  async signIn(signinHostDto: SigninHostDto): Promise<any> {
    // Fetch the host using email from the DTO
    const host = await this.hostService.findHostByEmail(signinHostDto.email);
    
    if (!host) {
      throw new NotFoundException('Host not found'); // Host not found
    }
    
    // Check password validity
    if (host.pass !== signinHostDto.password) {
      throw new UnauthorizedException('Invalid credentials'); // Invalid password
    }

    // Create JWT payload
    const payload = { hostEmail: host.email, sub: host.id }; // Use host.id instead of hard-coded values
    return {
      access_token: await this.jwtService.signAsync(payload), // Generate JWT token
      username: host.username, // Return host name
    };
  }
}
