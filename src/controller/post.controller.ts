import { Request, Response } from "express";
import postModel from "../models/post.model";

export const getPost = async (req: Request, res: Response) => {
  try {
    const posts = await postModel.find({});
    res.json(posts);
  } catch (error: any) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const createPosts = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const posts = await postModel.create(data);
    res.json(posts);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: "Not create post" });
  }
};
// GET http://localhost:8080/search/text
export const getSearchPosts = async (req: Request, res: Response) => {
  const search = req.params.search;
  try {
    const posts = await postModel.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { body: { $regex: search, $options: "i" } },
      ],
    });
    res.status(200).json(posts);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPostsSorted = async (req: Request, res: Response) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// localhost:8080/posts/skip?skip=10&limit=5
export const getPostsSkip = async (req: Request, res: Response) => {
  const limit = 10;
  const skip = parseInt(req.query.skip as string) || 0;
  const startIndex = skip;
  try {
    const totalPosts = await postModel.countDocuments();
    const posts = await postModel
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex);

    res.status(200).json({
      posts,
      skip: skip,
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET http://localhost:8080/posts/2?limit=10
export const getPostsPage = async (req: Request, res: Response) => {
  const page = parseInt(req.params.page);
  const limit = 10;
  const startIndex = (page - 1) * limit;
  try {
    const totalPosts = await postModel.countDocuments();
    const posts = await postModel
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
