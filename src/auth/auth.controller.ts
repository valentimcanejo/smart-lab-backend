import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Get,
  Param,
} from '@nestjs/common';

import { AuthPrisma } from './auth.prisma';

interface Auth {
  email: string;
  senha: string;
}

@Controller('auth')
export class AuthController {
  constructor(readonly repo: AuthPrisma) {}

  @Post('cadastrar')
  async cadastrar(@Body() auth: Auth) {
    try {
      await this.repo.cadastrar(auth);
      return { message: 'Usuário cadastrado com sucesso' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message || 'Erro ao cadastrar usuário',
          error: error?.stack || error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() auth: Auth) {
    try {
      const { token } = await this.repo.login(auth);
      return { message: 'Login efetuado com sucesso', token };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message || 'Erro ao fazer login',
          error: error?.stack || error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('autenticar/:token')
  async autenticar(@Param('token') token: string) {
    try {
      const autenticado = await this.repo.validarToken({
        token,
      });
      return { message: 'Login efetuado com sucesso', autenticado };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message || 'Erro ao autenticar token',
          error: error?.stack || error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
