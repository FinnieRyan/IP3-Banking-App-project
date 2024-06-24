import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';
import userSessionController from './userSessionController.js';
import UserSession from '../../database/models/userSession.js';
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
  app.get('/api/user-sessions', userSessionController.getAllUserSessions);
  app.post('/api/user-sessions', userSessionController.createUserSession);
  app.get('/api/user-sessions/:id', userSessionController.getSingleUserSession);
  app.put('/api/user-sessions/:id', userSessionController.updateUserSession);
  app.delete('/api/user-sessions/:id', userSessionController.deleteUserSession);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await UserSession.deleteMany({});
  await User.deleteMany({});
});

// Test Suite for User Session Controller
describe('User Session Controller', () => {
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
