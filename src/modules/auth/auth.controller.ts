import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpsStatus from "http-status";


const loginUser=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const paylod=req.body;
    console.log("paylod",paylod);
    const logingResult=await authService.loginUer(paylod);

    sendResponse(res,{
        success: true,
        statusCode:httpsStatus.OK,
        message:"User Loged in Successfuly",
        data:logingResult
    });

})

export const authController={
    loginUser
}