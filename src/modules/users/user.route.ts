import { NextFunction, Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import httpsStatus from "http-status";
import bcrypt from "bcryptjs";
import { userController } from "./user.controller";
import { jwtutils } from "../../utils/jwt";
import { Role } from "../../../generated/prisma/enums";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { error } from "node:console";
import { auth } from "../../middlewares/auth";

const router = Router();



router.post("/register", userController.registeruser);
router.get("/me", auth(Role.ADMIN,Role.AUTHOR,Role.USER),userController.getMyProfile);
router.put("/my-profile",auth(Role.ADMIN,Role.AUTHOR,Role.USER),userController.updateMyProfile)

export const userRouter = router;
