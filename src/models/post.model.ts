import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  userId: string;
  id: string;
  title: string;
  body: string;
}

const postSchema: Schema = new mongoose.Schema({
  userId: String,
  id: String,
  title: {
    type: String,
    required: true,
  },
  body: String,
});

const postModel = mongoose.model<IPost>("post", postSchema);

export default postModel;
