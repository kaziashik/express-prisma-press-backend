import { Result } from "postcss";
import { prisma } from "../../lib/prisma";
import { ICommentPayload, IpaylodUpadetComment } from "./comment.interface";

const createCommand = async (payload: ICommentPayload, userId: string) => {
  const result = await prisma.comment.create({
    data: {
      ...payload,
      authorId: userId,
    },
    include: {
      author: {
        omit: { password: true },
      },
    },
  });
  return result;
};

const GetCommanByID = async (commentId: string) => {
  const result = await prisma.comment.findFirstOrThrow({
    where: { id: commentId },
    include: {
      author: {
        omit: { password: true },
      },
      post: true,
    },
  });
  return result;
};

const GetCommandByAuthId = async (authorId: string) => {
  const result = await prisma.comment.findMany({
    where: { authorId },
    include: {
      post: true,
    },
  });
  return result;
};

const updateCommand = async (
  payload: IpaylodUpadetComment,
  commentId: string,
) => {
  const result = await prisma.comment.update({
    where: { id: commentId },
    data: {
      ...payload,
    },
    include: {
      author: {
        omit: { password: true },
      },
      post: true,
    },
  });
  return result;
};

const UpdateByModerate = async (
  payload: IpaylodUpadetComment,
  commentId: string,
  role: boolean,
) => {
//   const command = await prisma.comment.findFirstOrThrow({
//     where: { id: commentId },
//   });

  if (!role) {
    throw new Error("You do not have acces to update the command");
  }
  const result = await prisma.comment.update({
    where: { id: commentId },
    data: {
      ...payload,
    },
    include: {
      author: {
        omit: { password: true },
      },
      post: true,
    },
  });
  return result;
};

const deletCommand = async (commandId: string) => {
  const result= await prisma.comment.delete({
    where: {id: commandId},
    include: {
        author: {
            omit: {password: true}
        },
        post: true
    }
  })

  return result
};

export const CommentServise = {
  UpdateByModerate,
  createCommand,
  updateCommand,
  deletCommand,
  GetCommanByID,
  GetCommandByAuthId,
};
