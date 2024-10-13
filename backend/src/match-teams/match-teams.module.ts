import { Module } from '@nestjs/common';
import { MatchTeamsService } from './match-Teams.service';
import { MatchTeamsController } from './match-Teams.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [MatchTeamsService, PrismaService],
  controllers: [MatchTeamsController],
})
export class MatchTeamsModule {}
