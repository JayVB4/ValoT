import { Controller, Get, UseGuards } from '@nestjs/common';
import { HostGuard } from 'src/aHost-backend/HostSignin/host.gaurd';

@Controller('api/profile')
export class ProfileController {
  @UseGuards(HostGuard)
  @Get()
  async profile() {
    return {
      error: false,
      message: 'Hosts profile fetched successfully',
    };
  }
}
