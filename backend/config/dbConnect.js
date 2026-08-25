import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected!");
  } catch (error) {
    console.log(error);
  }
};
export default dbConnect;
