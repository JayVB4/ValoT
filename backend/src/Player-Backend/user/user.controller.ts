import { UserService } from './user.service';
import { Body, Controller, Get, Post, Patch, Param } from '@nestjs/common';
import { CreateUserDto,UpdateUserDto} from '../dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): string {
    return 'user';
  }

  @Get(':teamId') // Define a route to fetch users by team ID
  async findUsersByTeam(@Param('teamId') teamId: string){
    return this.userService.findUsersByTeamId(Number(teamId));
  }

  @Patch(':id') // Add a parameter for the user ID
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
