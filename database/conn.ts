import mongoose from "mongoose";

const connectMongo = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URL environment variable inside .env.local"
    );
  }
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI ?? "");
    if (connection.readyState === 1) console.log("Connected to Mongoose");
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export default connectMongo;


