import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';
import customerController from './customerController.js';
import Customer from '../../database/models/customer.js';
import User from '../../database/models/user.js';

dotenv.config();

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app = express();
  app.use(bodyParser.json());

  // Register routes
  app.get('/api/customers', customerController.getAllCustomers);
  app.post('/api/customers', customerController.createCustomer);
  app.get('/api/customers/:id', customerController.getSingleCustomer);
  app.put('/api/customers/:id', customerController.updateCustomer);
  app.delete('/api/customers/:id', customerController.deleteCustomer);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Customer.deleteMany({});
  await User.deleteMany({});
});

describe('Customer Controller', () => {
  test('POST /api/customers should create a new customer', async () => {
    const newUser = new User({
      username: 'testuser',
      passwordHash: 'password',
      email: 'test@example.com',
    });
    await newUser.save();

    const newCustomer = {
      userId: newUser._id.toString(),
      forename: 'Test',
      surname: 'Customer',
      address: '123 Test St',
      contactNumber: '1234567890',
    };

    const response = await request(app)
      .post('/api/customers')
      .send(newCustomer);
    expect(response.status).toBe(201);
    expect(response.body.forename).toBe('Test');

    const customerInDb = await Customer.findOne({ forename: 'Test' });
    expect(customerInDb).not.toBeNull();
    expect(customerInDb.surname).toBe('Customer');
  });

  test('PUT /api/customers/:id should update a customer', async () => {
    const newUser = new User({
      username: 'testuser',
      passwordHash: 'password',
      email: 'test@example.com',
    });
    await newUser.save();

    const newCustomer = new Customer({
      userId: newUser._id,
      forename: 'John',
      surname: 'Doe',
    });
    await newCustomer.save();

    const updatedCustomerData = {
      forename: 'Jane',
      surname: 'Doe',
      address: '456 Test St',
      contactNumber: '0987654321',
    };

    const response = await request(app)
      .put(`/api/customers/${newCustomer._id}`)
      .send(updatedCustomerData);
    expect(response.status).toBe(200);
    expect(response.body.forename).toBe('Jane');
    expect(response.body.surname).toBe('Doe');
    expect(response.body.address).toBe('456 Test St');
  });

  test('DELETE /api/customers/:id should delete a customer', async () => {
    const newUser = new User({
      username: 'testuser',
      passwordHash: 'password',
      email: 'test@example.com',
    });
    await newUser.save();

    const newCustomer = new Customer({
      userId: newUser._id,
      forename: 'John',
      surname: 'Doe',
    });
    await newCustomer.save();

    const response = await request(app).delete(
      `/api/customers/${newCustomer._id}`
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Customer deleted successfully');

    const customerInDb = await Customer.findById(newCustomer._id);
    expect(customerInDb).toBeNull();
  });
});
