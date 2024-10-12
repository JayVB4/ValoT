import { Controller, Get, UseGuards } from '@nestjs/common';
import { SiginGaurd } from '../../Player-Backend/signin/signin.gaurd';
// same files have been used for siginguards and hostguards
// more study is remaining on these content
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
