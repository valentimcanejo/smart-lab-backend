import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';

import { UnidadesPrisma } from './unidade.prisma';
import { Unidade } from '@prisma/client';

@Controller('unidades')
export class UnidadesController {
  constructor(readonly repo: UnidadesPrisma) {}

  @Post()
  async salvarUnidade(@Body() unidade: Unidade) {
    const unidadeCadastrada = await this.repo.buscarUnidadePorNome({
      nome: unidade.nome,
    });

    if (unidadeCadastrada && unidadeCadastrada.id !== unidade.id) {
      throw new HttpException('Já existe uma unidade com esse nome.', 400);
    }

    await this.repo.createUnidade(unidade);
  }

  @Get()
  async buscarUnidades() {
    const unidades = await this.repo.unidades({});
    return unidades;
  }
}
