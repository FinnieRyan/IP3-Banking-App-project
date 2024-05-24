import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {})
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err)
    throw err
  }
}

export default connectDB
