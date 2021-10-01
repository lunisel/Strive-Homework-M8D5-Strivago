import express from 'express'
import UserModel from '../user/schema.js'
import createError from 'http-errors'

const UsersRouter = express.Router()

UsersRouter.post('/register', async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body)
    const savedUser = await newUser.save()
    const token = await getJWT(savedUser)
    res.status(201).send({ token, user: savedUser })
  } catch (error) {
    next(createError(400, error))
  }
})

UsersRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.checkCredentials(email, password)
    if (user) {
      const accessToken = await getJWT(user)
      res.send({ accessToken })
    } else {
      next(createError(401, 'Invalid Credentials'))
    }
  } catch (error) {
    next(createError(500, error))
  }
})

export default UsersRouter
