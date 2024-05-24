import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import protectedRoutes from './routes/protected.js'
import connectDB from '../database/config/helpers.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.SERVER_PORT || 3500

const connectToDBAndStartServer = async () => {
  try {
    await connectDB()
    console.log('Connected to MongoDB')
    // Start the server after connecting to the database
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

app.use(bodyParser.json())

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Error-handling middleware:', err.stack)
  res.status(500).json({ message: err.message })
})

app.use('/api', protectedRoutes)

connectToDBAndStartServer()
// MongoDB connection error handler
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error)
})

//const PORT = process.env.PORT || 5001;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
