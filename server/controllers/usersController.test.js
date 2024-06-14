import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import usersController from './usersController.js';
import User from '../../database/models/user.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get('/api/users', usersController.getAllUsers);
app.post('/api/users', usersController.createUser);
app.get('/api/users/:id', usersController.getSingleUser);
app.put('/api/users/:id', usersController.updateUser);
app.delete('/api/users/:id', usersController.deleteUser);

jest.setTimeout(30000); // Increase Jest timeout to 30 seconds

describe('Users Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test('GET /api/users should return a list of users', async () => {
    const testUser1 = new User({
      username: 'user1',
      passwordHash: 'password1',
      email: 'user1@example.com',
    });
    const testUser2 = new User({
      username: 'user2',
      passwordHash: 'password2',
      email: 'user2@example.com',
    });
    await testUser1.save();
    await testUser2.save();

    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test('POST /api/users should create a new user', async () => {
    const newUser = {
      username: 'newuser',
      passwordHash: 'newpassword',
      email: 'newuser@example.com',
    };

    const response = await request(app).post('/api/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.username).toBe(newUser.username);

    const userInDb = await User.findOne({ username: newUser.username });
    expect(userInDb).not.toBeNull();
  });

  test('GET /api/users/:id should return a single user by ID', async () => {
    const newUser = new User({
      username: 'testuser',
      passwordHash: 'testpassword',
      email: 'testuser@example.com',
    });
    await newUser.save();

    const response = await request(app).get(`/api/users/${newUser._id}`);
    expect(response.status).toBe(200);
    expect(response.body.username).toBe(newUser.username);
  });

  test('PUT /api/users/:id should update a user by ID', async () => {
    const newUser = new User({
      username: 'testuser',
      passwordHash: 'testpassword',
      email: 'testuser@example.com',
    });
    await newUser.save();

    const updatedUserData = {
      username: 'updateduser',
      email: 'updateduser@example.com',
    };

    const response = await request(app)
      .put(`/api/users/${newUser._id}`)
      .send(updatedUserData);
    expect(response.status).toBe(200);
    expect(response.body.username).toBe(updatedUserData.username);

    const userInDb = await User.findById(newUser._id);
    expect(userInDb.username).toBe(updatedUserData.username);
  });

  test('DELETE /api/users/:id should delete a user by ID', async () => {
    const newUser = new User({
      username: 'testuser',
      passwordHash: 'testpassword',
      email: 'testuser@example.com',
    });
    await newUser.save();

    const response = await request(app).delete(`/api/users/${newUser._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');

    const userInDb = await User.findById(newUser._id);
    expect(userInDb).toBeNull();
  });
});
