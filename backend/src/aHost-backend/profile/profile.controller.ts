import { Controller, Get, UseGuards } from '@nestjs/common';
import { HostGuard } from '../../aHost-backend/HostSignin/host.gaurd';

@Controller('host')
export class HostProfileController {
  @UseGuards(HostGuard)
  @Get('profile')
  async profile() {
    return {
      error: false,
      message: 'Hosts profile fetched successfully',
    };
  }
}
