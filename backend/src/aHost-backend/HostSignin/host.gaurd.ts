import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constants'; // Adjust the import path as needed
  import { Request } from 'express';
  
  @Injectable()
  export class HostGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException({
          error: true,
          message: 'Token does not exist',
        });
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        // Ensure the payload is for a host
        if (payload.role !== 'host') {
          throw new UnauthorizedException({
            error: true,
            message: 'Unauthorized access for non-host users',
          });
        }
        // Attach the payload to the request object
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException({
          error: true,
          message: 'Invalid token',
        });
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  