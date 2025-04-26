import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';
const prisma = new PrismaClient();
async function main() {
  await prisma.exame.createMany({
    data: [
      {
        nome: 'COLESTEROL HDL, LDL, VLDL OU TOTAL',
        instrucoes:
          'Jejum aconselhável de 4 horas. Não se deve fazer uso de bebidas alcoólicas nas 72 horas que antecedem os exames.',
        material: 'Sangue',
        tempoEntrega: 'Em até 1 dia',
      },
      {
        nome: 'CREATININA - URINA',
        instrucoes:
          'Jejum não obrigatório. Retirar coletor e informativo na unidade Dna Center.',
        material: 'Urina de 24 horas',
        tempoEntrega: '1 dia útil',
      },
      {
        nome: 'HEMOGRAMA',
        instrucoes: 'Jejum não obrigatório.',
        material: 'Sangue',
        tempoEntrega: '1 dia útil',
      },
      {
        nome: 'HEPATITE B – HBSAG',
        instrucoes: 'Jejum aconselhável de 4 horas.',
        material: 'Sangue',
        tempoEntrega: 'Em até 5 dias',
      },
      {
        nome: 'IGE ESPECÍFICO (C410) - DROGAS - OMEPRAZOL',
        instrucoes: 'Não é necessário jejum.',
        material: 'Sangue',
        tempoEntrega: 'Em até 20 dias',
      },
      {
        nome: 'INSULINA',
        instrucoes: 'Jejum não obrigatório.',
        material: 'Sangue',
        tempoEntrega: '1 dia útil',
      },
      {
        nome: 'MAGNÉSIO - URINA DE 24 HORAS',
        instrucoes:
          'Primeiro dia: às 7 horas da manhã, urine, procurando esvaziar ao máximo a bexiga, despreze todo volume dessa amostra e inicie a coleta de todo o volume de todas as urinas das próximas 24 horas, • segundo dia: também, exatamente às 7 horas da manhã, ou seja, na mesma hora do dia anterior em que começou a coleta, urine, esforçando-se para esvaziar totalmente a bexiga. Conservar esse material refrigerado (2 a 8°C).Preferencialmente não realizar no período menstrual. Em casos excepcionais e nos de urgência, pode ser realizada a coleta de urina menstruada utilizando-se um tampão vaginal.',
        material: 'Urina de 24 horas',
        tempoEntrega: '1 dia útil',
      },
      {
        nome: 'MELATONINA',
        instrucoes:
          'Jejum não obrigatório. Para amostra noturna a coleta deve ser realizada entre 0:00 e 4:00 horas.',
        material: 'Sangue',
        tempoEntrega: 'Em até 30 dias',
      },
      {
        nome: 'POTÁSSIO',
        instrucoes: 'Jejum obrigatório de 04 horas.',
        material: 'Sangue',
        tempoEntrega: '1 dia útil',
      },
      {
        nome: 'PROTEÍNAS TOTAIS',
        instrucoes: 'Jejum não obrigatório.',
        material: 'Sangue',
        tempoEntrega: '1 dia útil',
      },
    ],
  });

  await prisma.unidade.createMany({
    data: [
      {
        nome: 'Dna Center',
        endereco:
          'Av. Brigadeiro Everaldo Breves, 780 - Centro, Parnamirim - RN, 59140-200',
        telefone: '(84) 99853-7680',
        latitude: -5.9211055,
        longitude: -35.4152012,
        horarioAtendimento: '08:00 a 17:00',
        foto: '',
      },
      {
        nome: 'Pardini',
        endereco:
          'Rua Américo Salvador Novelli, 154 - Itaquera, São Paulo - SP, 08210-090',
        telefone: '(84) 99853-7680',
        latitude: -23.5413272,
        longitude: -51.3336182,
        horarioAtendimento: '10:00 a 19:00',
        foto: '',
      },
      {
        nome: 'UNIMED',
        endereco:
          'Av. Sen. Salgado Filho, 233 - Lagoa Nova, Natal - RN, 59076-000',
        telefone: '(84) 99853-7680',
        latitude: -5.9350314,
        longitude: -35.3199028,
        horarioAtendimento: '09:00 a 18:00',
        foto: '',
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
