import { PrismaClient } from '@prisma/client'
import { fastify } from 'fastify'
import {z} from 'zod'

const app = fastify()
const prisma = new PrismaClient()

app.get('/', async () => {
  const tokens = await prisma.tokendb.findMany() 
  return { tokens }
})

app.post('/',async (request, reply) => {
  const createTokenSchema = z.object({
    token: z.string(),
    name: z.string(),
    date: z.string(),
    prioridade: z.string(),
  })

  const { token, name, date, prioridade } = createTokenSchema.parse(request.body)

  await prisma.tokendb.create({
    data : {
      token,
      name,
      date,
      prioridade,
    }
  })
  return reply.status(201).send()
})

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
  console.log('App Rodando')
})