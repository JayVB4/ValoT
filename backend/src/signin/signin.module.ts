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
import { SigninController } from './signin.controller';
import { UserService } from '../user/user.service';
import { SigninService } from './signin.service'; // Import PrismaService
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  controllers: [SigninController],
  providers: [PrismaService, UserService, SigninService], // Add PrismaService as a provider
})
export class SigninModule {}
