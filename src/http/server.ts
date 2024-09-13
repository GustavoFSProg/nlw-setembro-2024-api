import fastify from 'fastify'

const app = fastify()

const { PORT } = process.env

app.listen({ port: String(`${PORT}`) }).then(() => {
  console.log(` 💪 Server Running: ${PORT}!!`)
})

export default app
