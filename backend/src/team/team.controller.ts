import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  getAllTeams() {
    return this.teamService.getAllTeams();
  }

  @Get(':id')
  getTeamById(@Param('id') id: number) {
    return this.teamService.getTeamById(id);
  }

  @Post()
  createTeam(@Body() teamData) {
    return this.teamService.createTeam(teamData);
  }
}
