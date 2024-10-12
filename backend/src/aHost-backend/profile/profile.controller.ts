import { Controller, Get, UseGuards } from '@nestjs/common';
import { HostGuard } from 'src/aHost-backend/HostSignin/host.gaurd';

@Controller('api/host-profile')
export class HostProfileController {
  @UseGuards(HostGuard)
  @Get()
  async profile() {
    return {
      error: false,
      message: 'Hosts profile fetched successfully',
    };
  }
}
