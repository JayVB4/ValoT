import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchTeamsService {
  constructor(private prisma: PrismaService) {}

  async getAllMatchTeams() {
    return this.prisma.matchTeams.findMany();
  }

  async getMatchTeamById(id: number) {
    return this.prisma.matchTeams.findUnique({ where: { id } });
  }

  async createMatchTeam(matchTeamData: any) {
    return this.prisma.matchTeams.create({ data: matchTeamData });
  }
}
