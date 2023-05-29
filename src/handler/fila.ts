import { PrismaClient } from "@prisma/client";
import { contador } from "./filaControle";

const prisma = new PrismaClient();

export async function Fila() {
  const tickets = await prisma.tokendb.findMany({
    where: { status: true },
    orderBy: { id: 'asc' },
  });

  for (const ticket of tickets) {
    const { segundosGerais } = await contador(ticket.prioridade);
    const minutos = Math.floor(segundosGerais / 60);
    const segundos = segundosGerais % 60;
    
    await prisma.tokendb.update({
      where: { id: ticket.id },
      data: { status: false },
    });
  }
}
