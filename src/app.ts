import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import config from "./config";
import cors from "cors";
import { userRouter } from "./modules/users/user.route";
import { authRouter } from "./modules/auth/auth.routes";
import { commentRoutes } from "./modules/comments/comment.routes";
import { postRoutes } from "./modules/post/post.routes";
import { notFound } from "./middlewares/notFound";
import httpsStatus from "http-status";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

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
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

//if any roud not fund 
app.use(notFound);

//golable error handler
app.use(globalErrorHandler);

export default app;
