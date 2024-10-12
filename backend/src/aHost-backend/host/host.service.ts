// src/host/host.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHostDto } from 'src/aHost-backend/dto/createHost.dto';
import { Host } from '@prisma/client';

@Injectable()
export class HostService {
  constructor(private prisma: PrismaService) {}

  async create(createHostDto: CreateHostDto): Promise<Host> {
    return this.prisma.host.create({
      data: {
        username: createHostDto.username,
        email: createHostDto.email,
        pass: createHostDto.pass, // Map other required fields
      },
    });
  }

  async findHostByEmail(email: string): Promise<Host | null> {
    return this.prisma.host.findUnique({ where: { email } });
  }

  // Add other methods for host-specific functionalities
}
