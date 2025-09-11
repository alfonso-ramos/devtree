import mongoose from "mongoose";
import colors from 'colors';

export const connectDB = async () => { 
    try {
        const url = process.env.MONGO_URI;
        const {connection} = await mongoose.connect(url);
        const connectionPort = `${connection.host}:${connection.port}`
        console.log(`Connected to MongoDB at ${connectionPort}`);
    } catch (error) {
        console.error(colors.bgRed.black.bold(`Error connecting to MongoDB: ${error.message}`));
        process.exit(1);
    }
}

