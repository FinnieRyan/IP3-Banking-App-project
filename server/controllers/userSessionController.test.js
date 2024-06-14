import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userSessionController from './userSessionController.js';
import UserSession from '../../database/models/userSession.js';
import User from '../../database/models/user.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Define routes
app.get('/api/user-sessions', userSessionController.getAllUserSessions);
app.post('/api/user-sessions', userSessionController.createUserSession);
app.get('/api/user-sessions/:id', userSessionController.getSingleUserSession);
app.put('/api/user-sessions/:id', userSessionController.updateUserSession);
app.delete('/api/user-sessions/:id', userSessionController.deleteUserSession);

jest.setTimeout(30000); // Increase Jest timeout to 30 seconds

// Test Suite for User Session Controller
describe('User Session Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await UserSession.deleteMany({});
    await User.deleteMany({});
  });

  test('POST /api/user-sessions should create a new user session', async () => {
    // Create a new user for testing
    const newUser = new User({
      username: 'testuser',
      passwordHash: 'password',
      email: 'test@example.com',
    });
    await newUser.save();

    const newUserSession = {
      userId: newUser._id.toString(),
      sessionToken: 'abcdef123456',
    };

    const response = await request(app)
      .post('/api/user-sessions')
      .send(newUserSession);
    expect(response.status).toBe(201);

    const sessionInDb = await UserSession.findOne({
      sessionToken: 'abcdef123456',
    });
    expect(sessionInDb).not.toBeNull();
  });
});
