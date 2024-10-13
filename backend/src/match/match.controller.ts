import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  getAllMatches() {
    return this.matchService.getAllMatches();
  }

  @Get(':id')
  getMatchById(@Param('id') id: number) {
    return this.matchService.getMatchById(id);
  }

  @Post()
  createMatch(@Body() matchData) {
    return this.matchService.createMatch(matchData);
  }
}
