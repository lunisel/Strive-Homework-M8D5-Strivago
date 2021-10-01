import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const port = process.env.PORT;

const mongoConnection = process.env.MONGO_CONNECTION_STRING;

const server = express();

server.use(cors());
server.use(express.json());

server.listen(port, () => console.log(`Server is running on port ${port}`));
server.on("error", (error) => console.log(`Server faild : ${error}`));
