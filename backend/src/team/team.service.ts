import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async getAllTeams() {
    return this.prisma.team.findMany();
  }

  async getTeamById(id: number) {
    return this.prisma.team.findUnique({ where: { id } });
  }

  async createTeam(teamData: any) {
    return this.prisma.team.create({ data: teamData });
  }
}
