const express = require('express')
const serverless = require('serverless-http')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express()
app.use(express.json)
const router = express.Router()

router.post('/', async (req, res) => {
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

router.get('/token', async (req, res) => {
  try {
    const tokens = await prisma.token.findMany();
    res.json(tokens);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Falha ao buscar os tokens' });
  }
});


app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);