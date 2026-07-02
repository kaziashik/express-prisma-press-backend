import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { subscriptionService } from "./subscription.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"

const creatCheckOutSession= catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const userId=req.user?.id;

    const result=await subscriptionService.creatCheckOutSession(userId as string)
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "checkout compled successfully",
        data: result
    })
})

export const subscriptionController={

    creatCheckOutSession
}