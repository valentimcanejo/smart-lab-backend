import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaDBModule } from './prisma-db/db.module';
import { ExamesModule } from './exame/exame.module';

@Module({
  imports: [ExamesModule, PrismaDBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
