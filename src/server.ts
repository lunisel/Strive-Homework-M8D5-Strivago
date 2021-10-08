import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import accommodationRouter from "./services/accommodation/index";
import usersRouter from "./services/user/index";

process.env.TS_NODE_DEV && require("dotenv").config();

const port = process.env.PORT;

const mongoConnection = process.env.MONGO_CONNECTION_STRING;

const server = express();

server.use(cors());
server.use(express.json());

server.use("/accommodation", accommodationRouter);
server.use("/users", usersRouter);

console.table(listEndpoints(server));

if (!mongoConnection) {
  throw new Error("Mongo String undefined");
}

server.listen(port, async () => {
  try {
    mongoose.connect(mongoConnection);
    console.log(`Server is running on port ${port} and is connected to db`);
  } catch (err) {
    console.log("Db connection is faild", err);
  }
});
