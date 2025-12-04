import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //const MONGO_URI = process.env.MONGO_URI;
    const MONGO_LOCAL = process.env.MONGO_LOCAL;
    await mongoose.connect(MONGO_LOCAL);
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
