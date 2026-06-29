import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

/*
// 1. Create
POST /

//
// 2. Fixed/static routes
//
GET /stats
GET /search
GET /latest
GET /featured

//
// 3. Base route
//
GET /

//
// 4. Dynamic routes
//
GET /:id
PATCH /:id
DELETE /:id
*/

const router=Router()

router.post("/",auth(Role.ADMIN,Role.AUTHOR,Role.USER),postController.creatNewPost);
router.get("/stats",postController.stats)
router.get("/filter",postController.filteredPost)
router.get("/myposts",postController.getAllPost);
router.get("/:postId",postController.getSinglePost);
router.patch("/:postId",auth(Role.ADMIN,Role.AUTHOR,Role.USER),postController.updatePost);
router.delete("/:postId",auth(Role.ADMIN,Role.AUTHOR,Role.USER),postController.deletePost);

// router.get("/stats")

export const postRoutes=router