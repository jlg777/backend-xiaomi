import express, { json } from "express";
import cors from "cors";
import router from "./routes/home.routes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://fronten-xiaomi-react.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.options("/*", cors());

app.use(json());

app.use("/", router);

export default app;
