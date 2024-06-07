import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Import bcrypt
import User from '../models/user.js';
import Customer from '../models/customer.js';
import Account from '../models/account.js';
import Transaction from '../models/transactions.js';
import UserSession from '../models/userSession.js';
import seedData from './seedData.js';
import connectDB from '../config/helpers.js';

const { users, customers, accounts, transactions, userSessions } = seedData;

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Function to convert username to ObjectId
async function getUserIdByUsername(username) {
  const user = await User.findOne({ username });
  return user ? user._id : null;
}

async function getCustomerIdByUsername(username) {
  const userId = await getUserIdByUsername(username);
  const customer = await Customer.findOne({ userId });
  return customer ? customer._id : null;
}

// Function to seed the database
async function seedDatabase() {
  try {
    // Hash the passwords for each user before inserting
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => {
        if (!user.passwordHash) {
          throw new Error(`User ${user.username} does not have a passwordHash`);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.passwordHash, salt);
        return { ...user, passwordHash: hashedPassword };
      })
    );

    // Insert users with hashed passwords
    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    const userMap = {};
    createdUsers.forEach((user) => {
      userMap[user.username] = user._id;
    });

    // Insert customers and associate them with users
    const customersWithUserIds = customers.map((customer) => ({
      ...customer,
      userId: userMap[customer.userId],
    }));
    const createdCustomers = await Customer.insertMany(customersWithUserIds);
    const customerMap = {};
    createdCustomers.forEach((customer) => {
      customerMap[customer.userId] = customer._id;
    });

    // Insert accounts
    const accountsWithCustomerIds = await Promise.all(
      accounts.map(async (account) => ({
        ...account,
        customerId: customerMap[await getUserIdByUsername(account.customerId)],
      }))
    );
    const createdAccounts = await Account.insertMany(accountsWithCustomerIds);
    const accountMap = {};
    createdAccounts.forEach((account) => {
      accountMap[account.accountNumber] = account._id;
    });

    // Insert transactions with resolved account IDs
    const transactionsWithAccountIds = await Promise.all(
      transactions.map(async (transaction) => ({
        ...transaction,
        fromAccountId: accountMap[transaction.fromAccountNumber],
        toAccountId: accountMap[transaction.toAccountNumber],
      }))
    );

    await Transaction.insertMany(transactionsWithAccountIds);

    // Convert usernames to ObjectIds for user sessions
    const userSessionsWithUserIds = await Promise.all(
      userSessions.map(async (session) => ({
        ...session,
        userId: userMap[session.userId],
      }))
    );

    // Insert user sessions
    await UserSession.insertMany(userSessionsWithUserIds);

    console.log('Seed data inserted successfully');
  } catch (err) {
    console.error('Error inserting seed data:', err);
  } finally {
    mongoose.disconnect();
  }
}

// Call the seedDatabase function to seed the database
seedDatabase();
