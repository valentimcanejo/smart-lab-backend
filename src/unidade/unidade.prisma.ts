import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-db/prisma.service';
import { Unidade, Prisma } from '@prisma/client';

@Injectable()
export class UnidadesPrisma {
  constructor(private prisma: PrismaService) {}

  async buscarUnidadePorNome(
    where: Prisma.UnidadeWhereInput,
  ): Promise<Unidade | null> {
    return this.prisma.unidade.findFirst({
      where,
    });
  }

  async unidade(
    unidadeWhereUniqueInput: Prisma.UnidadeWhereUniqueInput,
  ): Promise<Unidade | null> {
    return this.prisma.unidade.findUnique({
      where: unidadeWhereUniqueInput,
    });
  }

  async unidades(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UnidadeWhereUniqueInput;
    where?: Prisma.UnidadeWhereInput;
    orderBy?: Prisma.UnidadeOrderByWithRelationInput;
  }): Promise<Unidade[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.unidade.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUnidade(data: Prisma.UnidadeCreateInput): Promise<Unidade> {
    return this.prisma.unidade.create({
      data,
    });
  }

  async updateUnidade(params: {
    where: Prisma.UnidadeWhereUniqueInput;
    data: Prisma.UnidadeUpdateInput;
  }): Promise<Unidade> {
    const { where, data } = params;
    return this.prisma.unidade.update({
      data,
      where,
    });
  }

  async deleteUnidade(where: Prisma.UnidadeWhereUniqueInput): Promise<Unidade> {
    return this.prisma.unidade.delete({
      where,
    });
  }
}
