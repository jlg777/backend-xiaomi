import dotenv from "dotenv";
import connectDB from "./db.js";
import app from "../app.js";
dotenv.config();

export const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
};
