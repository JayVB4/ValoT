
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';  //Ensure this service is created
import { Tourny } from '@prisma/client'; // Import your Prisma client types
import { PrismaService } from './prisma/prisma.service'; // Ensure you have a Prisma service

 @Controller('tournies')
export class AppController {
   constructor(private readonly prisma: PrismaService) {}

    //Get all tournies
   @Get()
   async getAllTournies(): Promise<Tourny[]> {
     return this.prisma.tourny.findMany();  //Fetch all tournies
   }

    //Get a specific tourny by ID
   @Get(':id')
   async getTourny(@Param('id') id: string): Promise<Tourny> {
     return this.prisma.tourny.findUnique({
       where: { id: Number(id) },
     });
   }


    //Create a new tourny
   @Post()
   async createTourny(@Body() tournyData: Omit<Tourny, 'id' | 'created_at'>): Promise<Tourny> {
     return this.prisma.tourny.create({
       data: tournyData,
     });
   }

    //Delete a tourny by ID
   @Delete(':id')
   async deleteTourny(@Param('id') id: string): Promise<Tourny> {
     return this.prisma.tourny.delete({
       where: { id: Number(id) },
     });
   }
}
