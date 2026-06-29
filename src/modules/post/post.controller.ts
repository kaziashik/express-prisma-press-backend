import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postServise } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import httpsStatus from "http-status";

const creatNewPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;
    const result = await postServise.creatNewPost(payload, id as string);
    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.CREATED,
      message: "post Created successfully",
      data: result,
    });
  },
);

const getAllPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postServise.getAllPost();
    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.OK,
      message: "your all the post fetch successfully",
      data: { result },
    });
  },
);

const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    const postId = req.params.postId;
    const payload = req.body;
    if (!postId) {
      throw new Error("Post id do nt fund");
    }

    const result = await postServise.updatePost(
      postId as string,
      payload,
      authorId as string,
      isAdmin,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.OK,
      message: "post  updated successfully",
      data: { result },
    });
  },
);

const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    const postId = req.params.postId;

    if (!postId) {
      throw new Error("Post id do nt fund");
    }
    const result = await postServise.deletePost(
      postId as string,
      authorId as string,
      isAdmin,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.OK,
      message: "post deleted succesfully ",
      data: { result },
    });
  },
);

const getSinglePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    if (!postId) {
      throw new Error("Post id do nt fund");
    }
    const result=await postServise.getSinglePost(postId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.OK,
      message: "signle post fetch successfully",
      data: {result},
    });
  },
);

/// Get posts statas

const stats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postServise.stats();

    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.OK,
      message: "Post stats retrived successfully",
      data: { result },
    });
  },
);

const filteredPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    postServise.filteredPost();
    sendResponse(res, {
      success: true,
      statusCode: httpsStatus.OK,
      message: "Filtered posts fetched successfully",
      data: {},
    });
  },
);

export const postController = {
  creatNewPost,
  getSinglePost,
  getAllPost,
  updatePost,
  deletePost,
  stats,
  filteredPost,
};
