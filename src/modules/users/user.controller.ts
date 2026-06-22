import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpsStatus from "http-status";
import { userService } from "./user.service";
import { StatusCodes } from "http-status-codes";

const registerUser=async (req: Request, res: Response) => {
  try {
    const payload = req.body;

const user=await userService.registerUserIntoDB(payload);
  

  res.status(httpsStatus.CREATED).json({
    success: true,
    StatusCodes: httpsStatus.CREATED,
    message: "user registerd successfully",
    data: {
      user,
    },
  });
    
  } catch (error) {
    console.log(error);
    res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        StatusCodes:httpsStatus.INTERNAL_SERVER_ERROR,
        message:"Failed to Register user",
        error: (error as Error).message
    })
    
  }
}

export const userController={
    registerUser
}