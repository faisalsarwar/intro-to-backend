import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
    `${process.env.MONGODB_URI}`
    );
    console.log(
      `\n MongoDb Connected !! ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connection Error: ".error);
    process.exist(1);
  }
};

export default connectDB;
