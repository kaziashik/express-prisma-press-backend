import { commentStatus } from "../../../generated/prisma/enums";

export interface ICommentPayload {
  content: string;
  postId: string;
}

export interface IpaylodUpadetComment {
  content?: string;
  postId?: string;
}
