import mongoose from 'mongoose'

const connectMongoDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to MongoDB");
            return;
        }
        await mongoose.connect("mongodb://localhost:27017/next-14-project");
        console.log("Connected Successfully to the MongoDB");
    } catch (error) {
        console.log("error in connection", error)
    }
}
export default connectMongoDB;