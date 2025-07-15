import mongoose from "mongoose"

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGOKEY);
        console.log("Connected successfully");
    } catch (error) {
        console.error("Error connecting mongoose: ", error);
        process.exit(1);
    }
}