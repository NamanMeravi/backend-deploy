import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        // Check if already connected to avoid duplicate connections
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to MongoDB");
            return;
        }
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
}

export default dbConnect;