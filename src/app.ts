import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import config from "./config";
import cors from "cors";
import { prisma } from "./lib/prisma";
import httpsStatus from "http-status";
import bcrypt from "bcryptjs";
import { userRouter } from "./modules/users/user.route";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello, world");
});

// app.post();

app.use("/api/users",userRouter)

export default app;
