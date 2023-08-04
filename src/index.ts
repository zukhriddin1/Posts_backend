import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 8080;
async function runServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    app.listen(port, () => {
      console.log(`Server is running on${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

runServer();
