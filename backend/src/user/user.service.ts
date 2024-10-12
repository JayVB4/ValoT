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



// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Hash the password before saving it
    const hashedPassword = await hash(createUserDto.password, 10);
    
    // Create a new user using Prisma
    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
        phone_no: createUserDto.phone_no,
        discord: createUserDto.discord,
        status: createUserDto.status ?? true, // Default to true if not provided
        team_id: createUserDto.team_id, // Assign the team ID
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}


