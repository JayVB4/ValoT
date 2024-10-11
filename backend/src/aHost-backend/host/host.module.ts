import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Import PrismaService
import { UserService } from './host.service';
import { UserController } from './host.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService], // Add PrismaService to providers
})
export class UserModule {}
