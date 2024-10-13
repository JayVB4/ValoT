import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) {}

  async getAllMatches() {
    return this.prisma.match.findMany();
  }

  async getMatchById(id: number) {
    return this.prisma.match.findUnique({ where: { id } });
  }

  async createMatch(matchData: any) {
    return this.prisma.match.create({ data: matchData });
  }
}
