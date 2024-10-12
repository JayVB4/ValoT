import { Controller, Get, UseGuards } from '@nestjs/common';
import { HostGuard } from '../../aHost-backend/HostSignin/host.gaurd';
import { SiginGaurd } from 'src/signin/signin.gaurd';

@Controller('host')
export class HostProfileController {
  @UseGuards(SiginGaurd)
  @Get('profile')
  async profile() {
    return {
      error: false,
      message: 'Hosts profile fetched successfully',
    };
  }
}
