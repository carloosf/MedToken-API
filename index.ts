import { Request, Response } from 'express'
const cors = require('cors')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import express from 'express';

const port = process.env.PORT || 3000

const router = express.Router()
const app = express()
app.use(cors)
app.use(express.json())
app.use('/', router)

interface CreateTokenRequest {
  token: string
  nome: string
  data: string
  tipoToken: string
}

router.post('/', async (req: Request<CreateTokenRequest>, res: Response) => {
  const { token, nome, data, tipoToken } = req.body;

  try {
    const newToken = await prisma.token.create({
      data: {
        token,
        nome,
        data,
        tipoToken
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

app.listen(port, () => {
  console.log(`🚀 http://localhost:${port}`);
});
export default router
