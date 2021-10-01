import express from 'express'
import UserModel from '../user/schema.js'
import createError from 'http-errors'

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

// UsersRouter.post('/login', async (req, res, next) => {
//   try {

//   } catch (error) {
//     next(createError(500, error))
//   }
// })

export default UsersRouter
