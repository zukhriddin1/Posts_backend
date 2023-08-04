import express from "express";
import postRouter from "./routes/post.routes";

const app = express();

app.use(express.json());

app.use("/", postRouter);
app.use("/posts", postRouter);

export default app;
