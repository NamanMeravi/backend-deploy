import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

// ✅ Proper CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://frontend-deploy-neon-xi.vercel.app"
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Connect to MongoDB once at cold start
await dbConnect();

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Health check route (optional, good for testing)
app.get("/", (req, res) => {
  res.send("✅ Backend deployed successfully!");
});

export default app; // ✅ Export app for Vercel
