import { Request, Response } from 'express'
const express = require('express')
const serverless = require('serverless-http')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const router = express.Router()

interface CreateTokenRequest {
  token: string
  nome: string
  data: string
  tipoExame: string
}

router.post('/', async (req: Request<CreateTokenRequest>, res: Response) => {
  const { token, nome, data, tipoExame } = req.body;

  try {
    const newToken = await prisma.token.create({
      data: {
        token,
        nome,
        data,
        tipoExame
      },
    })

    res.status(201).json(newToken)
  } catch (error) {
    console.error(error)

    res.status(500).send({ error: 'Falha ao criar o token'})
  }
})

router.get('/token', async (req: Request, res: Response) => {

})

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);