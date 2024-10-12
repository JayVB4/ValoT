// import { HostService } from './host.service';
// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { CreateHostDto } from 'src/aHost-backend/dto/createHost.dto';

// @Controller('host')
// export class HostController {
//   constructor(private HostService: HostService) {}
//   @Post()
//   async create(@Body() CreateHostDto: CreateHostDto) {
//     return this.HostService.create(CreateHostDto);
//   }

//   @Get()
//   findAll(): string {
//     return 'host';
//   }
// }


import { HostService } from './host.service';
import { Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { CreateHostDto } from 'src/aHost-backend/dto/createHost.dto';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {} // Correct camel case

  @Post()
  async createHost(@Body() createHostDto: CreateHostDto) {
    try {
      // Attempt to create the host
      return await this.hostService.create(createHostDto);
    } catch (error) {
      // Log the error for detailed inspection
      console.error('Error occurred while creating host:', error);
      throw new InternalServerErrorException('Failed to create host. Please try again.');
    }
  }

  @Get()
  findAll(): string {
    return 'host';
  }
}
