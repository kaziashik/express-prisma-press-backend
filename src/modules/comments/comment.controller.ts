import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CommentServise } from "./comment.service";
import httpsStatus from "http-status";

const createCommand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId = req.user?.id;
    // const postId = req.params.postId;

    // if (!postId) {
    //   throw new Error("Post id do nt fund");
    // }
    const result = await CommentServise.createCommand(
      payload,
      userId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.OK,
      message: "post Creted successfully",
      data: { result },
    });
  },
);
const updateCommand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const commentId = req.params.commentId;
    if (!commentId) {
      throw new Error("commend Id not fund");
    }
    const result = await CommentServise.updateCommand(
      payload,
      commentId as string,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.OK,
      message: "post Creted successfully",
      data: { result },
    });
  },
);

const UpdateByModerate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const isAdmin=req.user?.role ==="ADMIN"
      const payload=req.body;
    const commentId=req.params.commentId;
    if(!commentId){
      throw new Error("commend Id not fund")
    }
    const result=await CommentServise.UpdateByModerate(payload,commentId as string, isAdmin );
    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.OK,
      message: "post Creted successfully",
      data: {result},
    });
  },
);

const deletCommand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commandId=req.params.commentId;
    // console.log(commandId);
    const result=await CommentServise.deletCommand( commandId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.OK,
      message: "post Creted successfully",
      data: {result},
    });
  },
);
const GetCommanByID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commandId = req.params.commendId;
    const result = await CommentServise.GetCommanByID(commandId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.OK,
      message: " command show successfully",
      data: { result },
    });
  },
);
const GetCommandByAuthId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const result = await CommentServise.GetCommandByAuthId(authorId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.OK,
      message: "Author all comand show successfully",
      data: { result },
    });
  },
);

export const CommentController = {
  UpdateByModerate,
  createCommand,
  updateCommand,
  deletCommand,
  GetCommanByID,
  GetCommandByAuthId,
};
