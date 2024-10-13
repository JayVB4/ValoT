import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { RegTeamsService } from './reg-Teams.service';

@Controller('regTeams')
export class RegTeamsController {
  constructor(private readonly regTeamsService: RegTeamsService) {}

  @Get()
  getAllRegTeams() {
    return this.regTeamsService.getAllRegTeams();
  }

  @Get(':id')
  getRegTeamById(@Param('id') id: number) {
    return this.regTeamsService.getRegTeamById(id);
  }

  @Post()
  createRegTeam(@Body() regTeamData) {
    return this.regTeamsService.createRegTeam(regTeamData);
  }
}
