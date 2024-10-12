import { Module } from '@nestjs/common';
import { HostProfileController } from './profile.controller';
import { HostGuard } from '../HostSignin/host.gaurd';

@Module({
  controllers: [HostProfileController],
  providers: [HostGuard],
})
export class HostProfileModule {}
