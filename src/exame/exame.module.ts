import { Module } from '@nestjs/common';
import { ExamesController } from './exame.controller';
import { PrismaDBModule } from '../prisma-db/db.module';
import { ExamesPrisma } from './exame.prisma';

@Module({
  imports: [PrismaDBModule],
  controllers: [ExamesController],
  providers: [ExamesPrisma],
})
export class ExamesModule {}
