import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExamesController } from './exame/exame.controller';
import { PrismaDBModule } from './prisma-db/db.module';

@Module({
  imports: [ExamesController, PrismaDBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
