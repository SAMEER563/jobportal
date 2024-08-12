import mongoose from "mongoose";


const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database not connected");
    }
}

export default connectDB;