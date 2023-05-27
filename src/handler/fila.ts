import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function Fila() {
  const spTickets = await prisma.tokendb.findMany({
    where: { prioridade: 'SP', status: true },
  });

  const seTickets = await prisma.tokendb.findMany({
    where: { prioridade: 'SE', status: true },
  });

  const sgTickets = await prisma.tokendb.findMany({
    where: { prioridade: 'SG', status: true },
  });

  if (spTickets.length > 0) {
    for (const ticket of spTickets) {
      const randomTimeOffset = Math.floor(Math.random() * 20) + 10;
      const tempoDeAtendimento = randomTimeOffset;
      console.log(`${ticket.prioridade} O ticket: ${ticket.token} levou ${tempoDeAtendimento} Minutos`)

      await prisma.tokendb.update({
        where: { id: ticket.id },
        data: { status: false },
      });
    }
  } else if (seTickets.length > 0) {
    for (const ticket of seTickets) {
      const randomTimeOffset = Math.floor(Math.random() * 1) + 0.1;
      const tempoDeAtendimento = randomTimeOffset;
      console.log(`${ticket.prioridade} O ticket: ${ticket.token} levou ${tempoDeAtendimento} Minutos`)

      await prisma.tokendb.update({
        where: { id: ticket.id },
        data: { status: false },
      });
    }
  } else if (sgTickets.length > 0) {
    for (const ticket of sgTickets) {
      const randomTimeOffset = Math.floor(Math.random() * 17) + 12;
      const tempoDeAtendimento = randomTimeOffset;
      console.log(`${ticket.prioridade} O ticket: ${ticket.token} levou ${tempoDeAtendimento} Minutos`)

      await prisma.tokendb.update({
        where: { id: ticket.id },
        data: { status: false },
      });
    }
  }
}
const intervalo = 20000 
setInterval(async () => {
  await Fila();
}, intervalo);
