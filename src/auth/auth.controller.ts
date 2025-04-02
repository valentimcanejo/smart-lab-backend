import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';

import { AuthPrisma } from './auth.prisma';
import { Usuario } from '@prisma/client';

interface Auth {
  email: string;
  senha: string;
}

@Controller('auth')
export class AuthController {
  constructor(readonly repo: AuthPrisma) {}

  @Post('cadastrar')
  async salvarAuth(@Body() auth: Auth) {
    await this.repo.cadastrar(auth);
  }
}
