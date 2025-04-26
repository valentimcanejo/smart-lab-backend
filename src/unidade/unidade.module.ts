import { Module } from '@nestjs/common';
import { UnidadesController } from './unidade.controller';
import { PrismaDBModule } from '../prisma-db/db.module';
import { UnidadesPrisma } from './unidade.prisma';

@Module({
  imports: [PrismaDBModule],
  controllers: [UnidadesController],
  providers: [UnidadesPrisma],
})
export class UnidadesModule {}
