import {
  createPosts,
  getPost,
  getPostsPage,
  getPostsSkip,
  getPostsSorted,
  getSearchPosts,
} from "../controller/post.controller";
import express from "express";

const postRouter = express.Router();

postRouter.get("/", getPost);
postRouter.post("/", createPosts);
postRouter.get("/search/:search", getSearchPosts);
postRouter.get("/posts/sorted-by-date", getPostsSorted);
postRouter.get("/posts/:page", getPostsPage);
postRouter.get("/posts/skip", getPostsSkip);
export default postRouter;
