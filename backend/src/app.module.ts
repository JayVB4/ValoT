import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SignupModule } from './signup/signup.module';
import { SigninModule } from './signin/signin.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaService } from './prisma/prisma.service'; // Import PrismaService

@Module({
  imports: [
    UserModule,
    SignupModule,
    SigninModule,
    ProfileModule,
    // Removed MongooseModule as Prisma will handle DB
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService], // Add PrismaService as a provider
})
export class AppModule {}
