import { Module } from '@nestjs/common';
import { TournyService } from './tourny.service';
import { TournyController } from './tourny.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [TournyService, PrismaService],
  controllers: [TournyController],
})
export class TournyModule {}
