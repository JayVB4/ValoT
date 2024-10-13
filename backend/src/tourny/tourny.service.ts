import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TournyService {
  constructor(private prisma: PrismaService) {}

  async getAllTournaments() {
    return this.prisma.tourny.findMany();
  }

  async getTournamentById(id: number) {
    return this.prisma.tourny.findUnique({ where: { id } });
  }

  async createTournament(tournyData: any) {
    return this.prisma.tourny.create({ data: tournyData });
  }
}
