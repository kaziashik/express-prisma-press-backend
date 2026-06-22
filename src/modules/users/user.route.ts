import { Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import httpsStatus from "http-status";
import bcrypt from "bcryptjs";
import { userController } from "./user.controller";


const router=Router();
router.post("/register",userController.registerUser);

export const userRouter=router;

