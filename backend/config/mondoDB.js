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
//mongodb+srv://ujjwalhyd:ujjwalhyd123@cluster0.gjteto6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0