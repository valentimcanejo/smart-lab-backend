import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma-db/prisma.service';
import { Prisma, Usuario } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { cadastrarSchema, loginSchema } from './auth.schema';

@Injectable()
export class AuthPrisma {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async cadastrar(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    const parsedData = cadastrarSchema.safeParse(data);

    if (!parsedData.success) {
      throw new BadRequestException(parsedData.error.errors);
    }

    const { email, senha } = parsedData.data;

    const user = await this.prisma.usuario.findUnique({ where: { email } });

    if (user) {
      throw new Error('Usuário já cadastrado');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    return this.prisma.usuario.create({
      data: {
        email,
        senha: senhaHash,
      },
    });
  }

  async login(data: { email: string; senha: string }) {
    const parsedData = loginSchema.safeParse(data);

    if (!parsedData.success) {
      throw new BadRequestException(parsedData.error.errors);
    }

    const { email, senha } = parsedData.data;

    const user = await this.prisma.usuario.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const token = this.jwtService.sign({ userId: user.id, email: user.email });

    return { token };
  }

  async validarToken({ token }: { token: string }) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
