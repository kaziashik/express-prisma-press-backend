import { Router } from "express";
import { CommentController } from "./comment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";



const router=Router()

router.post("/",auth(Role.ADMIN,Role.AUTHOR,Role.USER),CommentController.createCommand)
router.get("/author",CommentController.GetCommandByAuthId)
router.get("/:commentId",CommentController.GetCommanByID)
router.patch("/:commentId",auth(Role.ADMIN,Role.AUTHOR,Role.USER),CommentController.updateCommand)
router.patch("/:commentId/moderate",auth(Role.ADMIN),CommentController.UpdateByModerate)
router.delete("/:commentId",auth(Role.ADMIN,Role.AUTHOR,Role.USER),CommentController.deletCommand)



export const commentRoutes=router