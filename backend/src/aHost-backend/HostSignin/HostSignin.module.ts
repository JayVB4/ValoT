// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from 'src/schemas/user.schema';
// import { SigninController } from './signin.controller';
// import { UserService } from 'src/user/user.service';
// import { SigninService } from './signin.service';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
//     JwtModule.register({
//       global: true,
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: '1800s' },
//     }),
//   ],
//   controllers: [SigninController],
//   providers: [UserService, SigninService],
// })
// export class SigninModule {}


import { Module } from '@nestjs/common';
import { HostSigninController } from './HostSignin.controller';
import { HostSigninService } from './HostSignin.service'; 
import { PrismaService } from '../../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { HostService } from '../host/host.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  controllers: [HostSigninController],
  providers: [PrismaService, HostService, HostSigninService], // Add PrismaService as a provider
})
export class HostSigninModule {}
