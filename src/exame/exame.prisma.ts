import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Exame, Prisma } from '@prisma/client';

@Injectable()
export class ExamesService {
  constructor(private prisma: PrismaService) {}

  async exame(
    exameWhereUniqueInput: Prisma.ExameWhereUniqueInput,
  ): Promise<Exame | null> {
    return this.prisma.exame.findUnique({
      where: exameWhereUniqueInput,
    });
  }

  async exames(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ExameWhereUniqueInput;
    where?: Prisma.ExameWhereInput;
    orderBy?: Prisma.ExameOrderByWithRelationInput;
  }): Promise<Exame[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.exame.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createExame(data: Prisma.ExameCreateInput): Promise<Exame> {
    return this.prisma.exame.create({
      data,
    });
  }

  async updateExame(params: {
    where: Prisma.ExameWhereUniqueInput;
    data: Prisma.ExameUpdateInput;
  }): Promise<Exame> {
    const { where, data } = params;
    return this.prisma.exame.update({
      data,
      where,
    });
  }

  async deleteExame(where: Prisma.ExameWhereUniqueInput): Promise<Exame> {
    return this.prisma.exame.delete({
      where,
    });
  }
}
