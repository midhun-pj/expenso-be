import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  try {
    const url = `mongodb://localhost:27017/expenso`

    const conn = await mongoose.connect(url,)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`)
    process.exit(1)
  }
}

export default connectDB
