import express from 'express'
import UserModel from '../user/schema.js'
import createError from 'http-errors'
import { JWTMiddleware } from '../../auth/token.js'
import AccommodationModel from '../accommodation/schema.js'
import { JWTAuthenticate } from '../../auth/tools.js'

const UsersRouter = express.Router()

UsersRouter.get('/', async (req, res, next) => {
  try {
    const users = await UserModel.find()

    res.send(users)
  } catch (error) {
    console.log(error)
  }
})

UsersRouter.get('/:userId', async (req, res, next) => {
  try {
    const oneUser = await UserModel.findById(req.params.userId)

    res.send(oneUser)
  } catch (error) {
    console.log(error)
  }
})

UsersRouter.post('/register', async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body)
    const savedUser = await newUser.save()

    res.status(201).send(savedUser)
  } catch (error) {
    next(createError(400, error))
  }
})

UsersRouter.get('/me/accommodation', JWTMiddleware, async (req, res, next) => {
  try {
    res.send(req.user)
  } catch (error) {
    next(error)
  }
})

UsersRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await UserModel.checkCredentials(email, password)

    if (user) {
      const { accessToken, refreshToken } = await JWTAuthenticate(user)

      res.send({ accessToken, refreshToken })
    } else {
      next(createHttpError(401, 'Credentials are not ok!'))
    }
  } catch (error) {
    next(error)
  }
})
export default UsersRouter
