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

  @Get('team/:teamid') // Define the route for getting registered teams by tournament ID
  async findRegTeamsByTourneyId(@Param('teamid') id: string){
    return this.regTeamsService.findRegTeamsByTourneyId(Number(id)); // Convert ID to number and call the service method
  }

  @Post()
  createRegTeam(@Body() regTeamData) {
    return this.regTeamsService.createRegTeam(regTeamData);
  }
}
