import createHttpError from "http-errors";

export const hostOnlyMiddleware = ({ req, res, next }: any) => {
  if (req.user.role === "host") {
    next();
  } else {
    next(createHttpError(403, "Hosts only!"));
  }
};
