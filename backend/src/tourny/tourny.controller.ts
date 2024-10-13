import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TournyService } from './tourny.service';

@Controller('tourny')
export class TournyController {
  constructor(private readonly tournyService: TournyService) {}

  @Get()
  getAllTournaments() {
    return this.tournyService.getAllTournaments();
  }

  @Get(':id')
  getTournamentById(@Param('id') id: number) {
    return this.tournyService.getTournamentById(id);
  }

  @Post()
  createTournament(@Body() tournyData) {
    return this.tournyService.createTournament(tournyData);
  }
}
