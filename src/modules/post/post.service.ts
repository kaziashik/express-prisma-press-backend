import { Result } from "postcss";
import { prisma } from "../../lib/prisma";
import { ICreadpostPaylod, IUpdatePostPayload } from "./post.interface";
import { commentStatus, PostStatus } from "../../../generated/prisma/enums";

const creatNewPost = async (payload: ICreadpostPaylod, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });
  return result;
};

const getAllPost = async () => {
  const post = await prisma.post.findMany({
    include: {
      author: {
        omit: { password: true },
      },
      comments: true,
    },
  });

  return post;
};

const getSinglePost = async(postId: string) => {

const [,post]= await prisma.$transaction([
    prisma.post.update({
    where: {id:postId},
    data: {
      views: {
        increment: 1
      }
    }
  }),
  // throw new Error("Error throw to check vewincrement"),
  prisma.post.findFirstOrThrow({
    where: {id: postId},
    
    include: {
      author: {
        omit: {password: true},
      },
      comments: true,
    }
  })

]);
 
  return post;
};

const updatePost = async (
  postId: string,
  payload: IUpdatePostPayload,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: { id: postId },
  });

  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not the owner of this post!");
  }
  const result = await prisma.post.update({
    where: { id: postId },
    data: payload,
    include: {
      author: {
        omit: { password: true },
      },
      comments: true,
    },
  });

  return result;
};

const deletePost = async (
  postId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: { id: postId },
  });

  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not the owner of this post!");
  }

  const Result = await prisma.post.delete({
    where: { id: postId },
  });

  return Result;
};



//stastius of the post and comments
const stats = async () => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const totalPosts = await tx.post.count();
    const totalPublishePosts = await tx.post.count({
      where: {
        status: PostStatus.PUBLISHED,
      },
    });

    const totalDrafPosts = await tx.post.count({
      where: {
        status: PostStatus.DRAFT,
      },
    });

    const totalArchivedPosts = await tx.post.count({
      where: {
        status: PostStatus.ARCHIVED,
      },
    });

    const totalComments = await tx.comment.count();
    const totalApplovedCommants = await tx.comment.count({
      where: {
        status: commentStatus.APPROVED,
      },
    });

    const totalRejectCommants = await tx.comment.count({
      where: {
        status: commentStatus.REJECT,
      },
    });
    const totalPostviewsAggreate = await tx.post.aggregate({
      _sum: {
        views: true,
      },
    });

    const totalPostViews = totalPostviewsAggreate._sum.views;

    return {
      totalPosts,
      totalPublishePosts,
      totalDrafPosts,
      totalArchivedPosts,

      totalComments,
      totalApplovedCommants,
      totalRejectCommants,
      totalPostviewsAggreate,
      totalPostViews,
    };
  });
  return transactionResult;
};

const filteredPost = () => {
  console.log("filtered post");
};

export const postServise = {
  creatNewPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  stats,
  filteredPost,
};
