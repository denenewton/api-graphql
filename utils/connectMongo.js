import mongoose from "mongoose";

let isConnected = false;

const conn = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGO);
    console.log("Connected with mongoDB");
    isConnected = true;
  } catch (error) {
    isConnected = false;
    console.log(error);
  }
};

export default conn;
