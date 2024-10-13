import { Module } from '@nestjs/common';
import { RegTeamsService } from './reg-Teams.service';
import { RegTeamsController } from './reg-Teams.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [RegTeamsService, PrismaService],
  controllers: [RegTeamsController],
})
export class RegTeamsModule {}
