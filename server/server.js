import https from 'https';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import protectedRoutes from './routes/protected.js';
import connectDB from '../database/config/helpers.js';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3500;

//add certificate 
const _ssl = path.resolve();
const privateKey = fs.readFileSync(path.join(_ssl, 'ssl', 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(_ssl, 'ssl', 'server.cert'), 'utf8');

const credentials = { key: privateKey, cert: certificate };

app.use(cors());

const connectToDBAndStartServer = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');
    // Start the server after connecting to the database
    https.createServer(credentials,app).listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

app.use(bodyParser.json());

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Error-handling middleware:', err.stack);
  res.status(500).json({ message: err.message });
});

app.use('/api', protectedRoutes);

connectToDBAndStartServer();
// MongoDB connection error handler
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
