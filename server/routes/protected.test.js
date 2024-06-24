import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import protectedRoutes from './protected.js';
import authMiddleware from '../middleware/auth.js';
import customerRoutes from './customerRoutes.js';
import accountRoutes from './accountRoutes.js';
import transactionRoutes from './transactionRoutes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Mock the auth middleware to avoid actual authentication
jest.mock('../middleware/auth.js', () => jest.fn((req, res, next) => next()));

// Mock the routes used by protected.js
jest.mock('./customerRoutes.js');
jest.mock('./accountRoutes.js');
jest.mock('./transactionRoutes.js');

// Use the protected routes
app.use('/api', protectedRoutes);

// Use mocked routes
app.use('/api/customers', customerRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);

jest.setTimeout(30000);

// Test Suite for Protected Routes
describe('Protected Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /api/protected should return access granted message', async () => {
    const response = await request(app).get('/api/protected');
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('Access to protected resource granted');
  });
});
