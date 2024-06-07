import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Customer from '../models/customer.js';
import Account from '../models/account.js';
import Transaction from '../models/transactions.js';
import UserSession from '../models/userSession.js';
import connectDB from '../config/helpers.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Function to clear the entire database
async function clearDatabase() {
  try {
    // Drop all collections in the database
    await Promise.all([
      User.deleteMany(),
      Customer.deleteMany(),
      Account.deleteMany(),
      Transaction.deleteMany(),
      UserSession.deleteMany(),
    ]);
    console.log('Database cleared successfully');
  } catch (err) {
    console.error('Error clearing database:', err);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
}

// Call the clearDatabase function to clear the database
clearDatabase();
