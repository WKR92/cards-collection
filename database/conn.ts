// import mongoose from "mongoose";

// const connectMongo = async () => {
//   if (!process.env.MONGO_URI) {
//     throw new Error(
//       "Please define the MONGO_URL environment variable inside .env.local"
//     );
//   }
//   try {
//     const { connection } = await mongoose.connect(process.env.MONGO_URI ?? "");
//     if (connection.readyState === 1) console.log("Connected to Mongoose");
//   } catch (errors) {
//     return Promise.reject(errors);
//   }
// };

// export default connectMongo;

import mongoose from "mongoose";

export async function dbConnect() {
  if (!process.env.MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URL environment variable inside .env.local"
    );
  }

  try {
    if (global.mongoose && global.mongoose.conn) {
      console.log("Connected from previous");
      return global.mongoose.conn;
    } else {
      const conString = process.env.MONGO_URL || "";

      const promise = mongoose.connect(conString);

      global.mongoose = {
        conn: await mongoose.connect(conString),
        promise,
      };

      console.log("Newly connected");
      return await promise;
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}

export const disconnect = () => {
  if (!global.mongoose.conn) {
    return;
  }
  global.mongoose.conn = null;
  mongoose.disconnect();
};

process.on("beforeExit", async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
});
