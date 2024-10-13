import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { MatchTeamsService } from './match-Teams.service';

@Controller('matchTeams')
export class MatchTeamsController {
  constructor(private readonly matchTeamsService: MatchTeamsService) {}

  @Get()
  getAllMatchTeams() {
    return this.matchTeamsService.getAllMatchTeams();
  }

  @Get(':id')
  getMatchTeamById(@Param('id') id: number) {
    return this.matchTeamsService.getMatchTeamById(id);
  }

  @Post()
  createMatchTeam(@Body() matchTeamData) {
    return this.matchTeamsService.createMatchTeam(matchTeamData);
  }
}
