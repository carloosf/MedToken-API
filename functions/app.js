const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
const router = express.Router()

router.post('/', async (req, res) => {
  const { token, name, date, prioridade } = req.body;

  try {
    const newToken = await prisma.TokenDB.create({
      data: {
        token,
        name,
        date,
        prioridade
      },
    })

    res.status(201).json(newToken)
  } catch (error) {
    console.error(error)

    res.status(500).send({ error: 'Falha ao criar o token'})
  }
})

router.get('/token', async (req, res) => {
  try {
    const tokens = await prisma.token.findMany();
    res.json(tokens);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Falha ao buscar os tokens' });
  }
});

/* app.use('/', router)
const port = 3005
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
}); */


app.use('/', router);
module.exports.handler = serverless(app);
const serverless = require('serverless-http')

