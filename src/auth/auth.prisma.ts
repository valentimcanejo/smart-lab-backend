import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-db/prisma.service';
import { Prisma, Usuario } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthPrisma {
  constructor(private prisma: PrismaService) {}

  async cadastrar({
    email,
    senha,
  }: Prisma.UsuarioCreateInput): Promise<Usuario> {
    const user = await this.prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new Error('Usuário já cadastrado');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    return this.prisma.usuario.create({
      data: {
        email,
        senha: senhaHash,
      },
    });
  }
}
