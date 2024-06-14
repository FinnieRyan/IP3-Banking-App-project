import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import accountController from './accountController.js';
import Account from '../../database/models/account.js';
import Customer from '../../database/models/customer.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get('/api/accounts', accountController.getAllAccounts);
app.post('/api/accounts', accountController.createAccount);
app.get('/api/accounts/customer/:id', accountController.getAllCustomerAccounts);
app.put('/api/accounts/:id', accountController.updateAccount);
app.delete('/api/accounts/:id', accountController.deleteAccount);

jest.setTimeout(30000); // Increase Jest timeout to 30 seconds

describe('Account Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Account.deleteMany({});
    await Customer.deleteMany({});
  });

  test('GET /api/accounts should return a list of accounts', async () => {
    const customer = new Customer({
      userId: '60d9ca2f1f1a1c001c8e4b8c',
      forename: 'John',
      surname: 'Doe',
    });
    await customer.save();

    const account = new Account({
      customerId: customer._id,
      accountType: 'Savings',
      balance: 1000,
      accountNumber: '12345678',
      sortCode: '12-34-56',
    });
    await account.save();

    const response = await request(app).get('/api/accounts');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].accountNumber).toBe('12345678');
  });

  test('POST /api/accounts should create a new account', async () => {
    const customer = new Customer({
      userId: '60d9ca2f1f1a1c001c8e4b8c',
      forename: 'Jane',
      surname: 'Doe',
    });
    await customer.save();

    const newAccount = {
      customerId: customer._id.toString(),
      accountType: 'Current',
      balance: 2000,
      accountNumber: '87654321',
      sortCode: '65-43-21',
    };

    const response = await request(app).post('/api/accounts').send(newAccount);
    expect(response.status).toBe(201);
    expect(response.body.accountNumber).toBe('87654321');

    const accountInDb = await Account.findOne({ accountNumber: '87654321' });
    expect(accountInDb).not.toBeNull();
    expect(accountInDb.accountType).toBe('Current');
  });

  test('GET /api/accounts/customer/:id should return all accounts for a customer', async () => {
    const customer = new Customer({
      userId: '60d9ca2f1f1a1c001c8e4b8c',
      forename: 'John',
      surname: 'Doe',
    });
    await customer.save();

    const account1 = new Account({
      customerId: customer._id,
      accountType: 'Savings',
      balance: 1000,
      accountNumber: '12345678',
      sortCode: '12-34-56',
    });
    const account2 = new Account({
      customerId: customer._id,
      accountType: 'Current',
      balance: 500,
      accountNumber: '87654322',
      sortCode: '65-43-22',
    }); // Ensure unique accountNumber
    await account1.save();
    await account2.save();

    const response = await request(app).get(
      `/api/accounts/customer/${customer.userId}`
    );
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test('PUT /api/accounts/:id should update an account', async () => {
    const customer = new Customer({
      userId: '60d9ca2f1f1a1c001c8e4b8c',
      forename: 'John',
      surname: 'Doe',
    });
    await customer.save();

    const account = new Account({
      customerId: customer._id,
      accountType: 'Savings',
      balance: 1000,
      accountNumber: '12345678',
      sortCode: '12-34-56',
    });
    await account.save();

    const updatedAccountData = {
      accountType: 'Current',
      balance: 2000,
      accountNumber: '12345678',
      sortCode: '12-34-56',
    };

    const response = await request(app)
      .put(`/api/accounts/${account._id}`)
      .send(updatedAccountData);
    expect(response.status).toBe(200);
    expect(response.body.accountType).toBe('Current');
  });

  test('DELETE /api/accounts/:id should delete an account', async () => {
    const customer = new Customer({
      userId: '60d9ca2f1f1a1c001c8e4b8c',
      forename: 'John',
      surname: 'Doe',
    });
    await customer.save();

    const account = new Account({
      customerId: customer._id,
      accountType: 'Savings',
      balance: 1000,
      accountNumber: '12345678',
      sortCode: '12-34-56',
    });
    await account.save();

    const response = await request(app).delete(`/api/accounts/${account._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Account deleted successfully');

    const accountInDb = await Account.findById(account._id);
    expect(accountInDb).toBeNull();
  });
});
