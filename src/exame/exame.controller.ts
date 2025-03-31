import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';

import { ExamesPrisma } from './exame.prisma';
import { Exame } from '@prisma/client';

@Controller('exames')
export class ExamesController {
  constructor(readonly repo: ExamesPrisma) {}

  @Post()
  async salvarExame(@Body() exame: Exame) {
    const exameCadastrado = await this.repo.buscarExamePorNome({
      nome: exame.nome,
    });

    if (exameCadastrado && exameCadastrado.id !== exame.id) {
      throw new HttpException('Já existe um exame com esse nome.', 400);
    }

    await this.repo.createExame(exame);
  }

  @Get()
  async buscarExames() {
    const exames = await this.repo.exames({});
    return exames;
  }
}
