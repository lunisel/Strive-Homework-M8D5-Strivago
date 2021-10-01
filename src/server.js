import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { errorsHandlers } from './errorHandlers.js'

const port = process.env.PORT

const mongoConnection = process.env.MONGO_CONNECTION_STRING

const server = express()

server.use(cors())
server.use(express.json())

// ENDPOINTS
server.use('/users', usersRouter)

// ERROR MIDDLEWARES
server.use(errorsHandlers)

server.listen(port, async () => {
  try {
    mongoose.connect(mongoConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`Server is running on port ${port} and is connected to db`)
  } catch (err) {
    console.log('Db connection is faild', err)
  }
})
