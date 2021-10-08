import jwt from 'jsonwebtoken'
import UserModel from '../services/user/schema'
import { UserInt } from "../services/user/index"

const generateJWT = (payload:string) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  )

const generateRefreshJWT = (payload:string) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '1 week' },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  )

export const verifyJWT = (token:string) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET!, (err, decodedToken) => {
      if (err) reject(err)
      resolve(decodedToken)
    })
  )

export const verifyRefreshJWT = (token:string) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_REFRESH_SECRET!, (err, decodedToken) => {
      if (err) reject(err)
      resolve(decodedToken)
    })
  )

export const JWTAuthenticate = async (user: UserInt) => {
  console.log('user HEEEERE', user)
  const accessToken = await generateJWT({ _id: user._id })
  const refreshToken = await generateRefreshJWT({ _id: user._id })
  // console.log('refreshToken on tooooools', refreshToken)

  user.refreshToken = refreshToken
  await user.save()

  return { accessToken, refreshToken }
}

export const refreshTokens = async (actualRefreshToken:string) => {
  try {
    const decodedRefreshToken: = await verifyRefreshJWT(actualRefreshToken)

    const user = await UserModel.findById(decodedRefreshToken._id)

    if (!user) throw new Error('User not found')

    if (user.refreshToken === actualRefreshToken) {
      const { accessToken, refreshToken } = await JWTAuthenticate(user)
      return { accessToken, refreshToken }
    }
  } catch (err) {
    console.log(err)
  }
}
