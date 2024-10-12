import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { UserService } from '../user/user.service';
import { SignupService } from './signup.service';
import { PrismaService } from '../prisma/prisma.service'; // Import PrismaService

@Module({
  imports: [],
  controllers: [SignupController],
  providers: [UserService, SignupService, PrismaService], // Add PrismaService as a provider
})
export class SignupModule {}
