import mongoose from "mongoose";
const mongodbURL = process.env.MONGODB_URI;

async function connectDB(){
  try {
    const conn = await mongoose.connect(mongodbURL);
    console.log(`MongoDB connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to DB: ${error.message}`);
    process.exit(1)
  }
}
export default connectDB;