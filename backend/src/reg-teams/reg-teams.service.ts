import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegTeamsService {
  constructor(private prisma: PrismaService) {}

  async getAllRegTeams() {
    return this.prisma.regTeams.findMany();
  }

  async getRegTeamById(id: number) {
    return this.prisma.regTeams.findUnique({ where: { id } });
  }

  async createRegTeam(regTeamData: any) {
    return this.prisma.regTeams.create({ data: regTeamData });
  }
}
