// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service'; // Import the PrismaService
// import { CreateUserDto } from 'src/dto/createUser.dto';
// import { User } from '@prisma/client'; // Import User type from Prisma

// @Injectable()
// export class UserService {
//   constructor(private prisma: PrismaService) {} // Inject PrismaService

//   async create(createUserDto: CreateUserDto): Promise<User> {
//     // Create a new user using Prisma
//     return this.prisma.user.create({
//       data: createUserDto,
//     });
//   }

//   async findUserByEmail(email: string): Promise<User | null> {
//     // Find a user by email using Prisma
//     const user = await this.prisma.user.findUnique({
//       where: { email: email },
//     });
//     if (!user) {
//       throw new NotFoundException(`User with email ${email} not found`);
//     }
//     return user; // Return the user if found
//   }
// }



import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findUserByEmail(email: string): Promise<User | null> { // Change the return type
    return this.prisma.user.findUnique({ where: { email } });
  }
}

