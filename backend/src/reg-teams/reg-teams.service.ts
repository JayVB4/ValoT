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

  async findRegTeamsByTourneyId(teamId: number){
    const team_id = Number(teamId)
    const regTeams = await this.prisma.regTeams.findMany({
      where: { team_id },
    });
    return regTeams; // Return the found registered teams
  }
}
