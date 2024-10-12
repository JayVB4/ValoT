import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Import PrismaService
import { HostService } from './host.service';
import { HostController } from './host.controller';

@Module({
  controllers: [HostController],
  providers: [HostService, PrismaService], // Add PrismaService to providers
})
export class HostModule {}
