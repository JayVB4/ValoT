import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service'; // Import PrismaService


import { UserModule } from './user/user.module';
import { SignupModule } from './signup/signup.module';
import { SigninModule } from './signin/signin.module';
import { ProfileModule } from './profile/profile.module';


import { HostModule } from './aHost-backend/host/host.module';
import { HostSignupModule } from './aHost-backend/signup/signup.module';
import { HostSigninModule } from './aHost-backend/HostSignin/HostSignin.module';
import { HostProfileModule } from './aHost-backend/profile/profile.module';

@Module({
  imports: [
    
    UserModule,
    SignupModule,
    SigninModule,
    ProfileModule,
    HostModule,
    HostSignupModule,
    HostSigninModule,
    HostProfileModule
    // Removed MongooseModule as Prisma will handle DB
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService], // Add PrismaService as a provider
})
export class AppModule {}
