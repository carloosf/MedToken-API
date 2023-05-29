import { PrismaClient } from '@prisma/client';
import { fastify } from 'fastify';
import { z } from 'zod';
import { Fila } from './handler/fila';

const app = fastify();
const prisma = new PrismaClient();

app.get('/', async () => {
  const tokens = await prisma.tokendb.findMany();
  return { tokens };
});

app.post('/', async (request, reply) => {
  try {
    const createTokenSchema = z.object({
      token: z.string(),
      name: z.string(),
      date: z.string(),
      prioridade: z.string(),
    });

    const { token, name, date, prioridade } = createTokenSchema.parse(request.body);

    await prisma.tokendb.create({
      data: {
        token,
        name,
        date,
        prioridade,
      },
    });

    return reply.status(201).send();
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error });
  }
});

app.put('/:id', async (request, reply) => {
  try {
    const updateStatusSchema = z.object({
      id: z.string(),
    });

    const { id } = updateStatusSchema.parse(request.params);
    const idNumber = Number(id);

    const existingToken = await prisma.tokendb.findUnique({
      where: { id: idNumber },
    });

    if (!existingToken) {
      return reply.status(404).send({ error: 'Token not found' });
    }

    await prisma.tokendb.update({
      where: { id: idNumber },
      data: {
        status: false,
      },
    });

    return reply.status(200).send();
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error });
  }
});

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
  console.log('App Rodando');
});

async function iniciarFila() {
  const getFila = await prisma.tokendb.findMany({
    where: { status: true },
  });

  if (getFila.length > 0) {
    await Fila();
  }
}

iniciarFila();

setInterval(iniciarFila, 1000);
