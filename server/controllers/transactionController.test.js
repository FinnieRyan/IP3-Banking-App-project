import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import transactionController from './transactionController.js';
import Transaction from '../../database/models/transactions.js';
import Account from '../../database/models/account.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Define routes
app.get('/api/transactions', transactionController.getAllTransactions);
app.get(
  '/api/transactions/:accountId',
  transactionController.getTransactionsByAccountId
);
app.post('/api/transactions', transactionController.createTransaction);
app.get('/api/transactions/:id', transactionController.getSingleTransaction);
app.put('/api/transactions/:id', transactionController.updateTransaction);
app.delete('/api/transactions/:id', transactionController.deleteTransaction);

jest.setTimeout(30000); // Increase Jest timeout to 30 seconds

// Test Suite for Transaction Controller
describe('Transaction Controller', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.DB_URI);
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
      throw err;
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Transaction.deleteMany({});
    await Account.deleteMany({});
  });

  test('GET /api/transactions should return a list of transactions', async () => {
    // Create sample accounts
    const account1 = new Account({
      customerId: new mongoose.Types.ObjectId(),
      accountType: 'Savings',
      balance: 1000,
      accountNumber: '12345678',
      sortCode: '12-34-56',
    });

    const account2 = new Account({
      customerId: new mongoose.Types.ObjectId(),
      accountType: 'Checking',
      balance: 2000,
      accountNumber: '87654321',
      sortCode: '65-43-21',
    });

    await account1.save();
    await account2.save();

    // Create sample transactions
    const transaction1 = new Transaction({
      fromAccountId: account1._id,
      toAccountId: account2._id,
      amount: 500,
      transactionType: 'Transfer',
      paymentMethod: 'Bank Transfer',
      pending: false,
      vendor: 'External',
      category: 'Internal Payment',
    });

    const transaction2 = new Transaction({
      fromAccountId: account2._id,
      toAccountId: account1._id,
      amount: 100,
      transactionType: 'Transfer',
      paymentMethod: 'Bank Transfer',
      pending: false,
      vendor: 'External',
      category: 'Internal Payment',
    });

    await transaction1.save();
    await transaction2.save();

    // Perform GET request
    const response = await request(app).get('/api/transactions');

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2); // Assuming two transactions were created
  });
});
