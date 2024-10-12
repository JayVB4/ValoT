import { Module } from '@nestjs/common';
import { SiginGaurd } from '../signin/signin.gaurd';
import { ProfileController } from './profile.controller';

@Module({
  controllers: [ProfileController],
  providers: [SiginGaurd],
})
export class ProfileModule {}
