import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { HostService } from '../host/host.service';
import { CreateHostDto } from '../dto/createHost.dto';

@Injectable()
export class HostSignupService {
  constructor(
    private hostService: HostService,
    private jwtService: JwtService,
  ) {}

  async signup(createHostDto: CreateHostDto): Promise<any> {
    const host = await this.hostService.create(createHostDto);

    const payload = { hostEmail: host.email, sub: 1 };
    return {
      access_token: await this.jwtService.signAsync(payload),
      hostname: host.username,
    };
  }
}
