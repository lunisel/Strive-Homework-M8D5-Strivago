import createHttpError from "http-errors";
import { verifyJWT } from "./tools";
import UserModel from "../services/user/schema";

interface decodedTokenInt {
  _id: string;
}

export const JWTMiddleware = async ({ req, res, next }: any) => {
  if (!req.headers.authorization) {
    next(createHttpError(401, "Header not found"));
  } else {
    try {
      const token: string = req.headers.authorization.replace("Bearer ", "");
      // console.log('Token from TOKEN.JS', token)

      const decodedToken: decodedTokenInt = await verifyJWT(token);

      // console.log('decodedToken from TOKEN.JS', decodedToken)

      const user = await UserModel.findById(decodedToken._id);

      if (user) {
        req.user = user;
        next();
      } else {
        next(createHttpError(404, "User not found"));
      }
    } catch (err) {
      console.log(err);
      next(createHttpError(401, "Token not found!"));
    }
  }
};
