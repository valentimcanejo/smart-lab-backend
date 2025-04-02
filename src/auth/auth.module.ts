import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaDBModule } from '../prisma-db/db.module';
import { AuthPrisma } from './auth.prisma';

@Module({
  imports: [PrismaDBModule],
  controllers: [AuthController],
  providers: [AuthPrisma],
})
export class AuthModule {}
