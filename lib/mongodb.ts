import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try{
        const mongodbUri = process.env.MONGODB_URI || ""; // Set a default value if process.env.MONGODB_URI is undefined
        await mongoose.connect(mongodbUri);
        console.log("Connected to MongoDB");
    }catch(error){
        console.log("Failed to connect to MongoDB", error);
    }
};