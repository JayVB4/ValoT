import { HostService } from './../host/host.service';
import { Module } from '@nestjs/common';
import { HostSignupController } from './signup.controller';
import { HostSignupService } from './signup.service';
import { PrismaService } from '../../prisma/prisma.service'; // Import PrismaService

@Module({
  imports: [],
  controllers: [HostSignupController],
  providers: [HostService, HostSignupService, PrismaService], // Add PrismaService as a provider
})
export class HostSignupModule {}
