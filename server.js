import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnect from './config/dbConnect.js'
import authRoutes from "./routes/auth.route.js";

const app = express();
 
dotenv.config();

//console.log("MONGODB_URI:", process.env.MONGODB_URI);
//console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Loaded" : "❌ Not found");

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
}));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Connect to database

let isConnected  = false;


dbConnect();

 app.use((req,res,next)=>{
    
        if(!isConnected){
            dbConnect();
        }
        next();
     
 })




export default app;