import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { HostGuard } from '../HostSignin/host.gaurd';

@Module({
  controllers: [ProfileController],
  providers: [HostGuard],
})
export class ProfileModule {}
