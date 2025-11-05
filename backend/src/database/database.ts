import mongoose from 'mongoose'
import { config } from '../config/app.config'


const connectDb = async()=>{
    try {
        await mongoose.connect(config.MONGO_URI as string)
        console.log("Connected to mongo database")
    } catch (error) {
        console.log("Error Connecting to database")
        process.exit(1)
    }
}

export default connectDb;