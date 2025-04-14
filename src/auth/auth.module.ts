import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaDBModule } from '../prisma-db/db.module';
import { AuthPrisma } from './auth.prisma';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaDBModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secreto_super_seguro', // Use uma variável de ambiente para segurança
      signOptions: { expiresIn: '1h' }, // Token expira em 1 hora
    }),
  ],
  controllers: [AuthController],
  providers: [AuthPrisma],
  exports: [AuthPrisma], // Exporta o serviço para ser usado em outros módulos
})
export class AuthModule {}
