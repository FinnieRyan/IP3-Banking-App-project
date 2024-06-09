import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import authRouter from './auth.js';
import User from '../../database/models/user.js';

// Mock the User model
jest.mock('../../database/models/user.js');

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

describe('Auth Routes', () => {
  describe('POST /register', () => {
    it('should register a new user successfully', async () => {
      User.findOne.mockResolvedValue(null); // Mock no user found
      User.prototype.save = jest.fn().mockResolvedValue({}); // Mock save method

      const res = await request(app).post('/auth/register').send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(201);
      expect(res.body.msg).toBe('User registration successful');
    });

    it('should return 400 if user already exists', async () => {
      User.findOne.mockResolvedValue({ username: 'testuser' }); // Mock user found

      const res = await request(app).post('/auth/register').send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(400);
      expect(res.body.msg).toBe('User already exists');
    });
  });

  describe('POST /login', () => {
    it('should login user and return access token', async () => {
      const mockUser = {
        _id: 'userId',
        username: 'testuser',
        email: 'testuser@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
      };
      User.findOne.mockResolvedValue(mockUser); // Mock user found
      jwt.sign = jest.fn().mockReturnValue('mockAccessToken'); // Mock JWT sign

      const res = await request(app).post('/auth/login').send({
        email: 'testuser@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(200);
      expect(res.body.accessToken).toBe('mockAccessToken');
      expect(res.body.user).toEqual({
        id: mockUser._id,
        username: mockUser.username,
        email: mockUser.email,
      });
    });

    it('should return 400 if username not found', async () => {
      User.findOne.mockResolvedValue(null); // Mock no user found

      const res = await request(app).post('/auth/login').send({
        email: 'nonexistent@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(400);
      expect(res.body.msg).toBe('Username not found');
    });

    it('should return 400 if password is incorrect', async () => {
      const mockUser = {
        _id: 'userId',
        username: 'testuser',
        email: 'testuser@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
      };
      User.findOne.mockResolvedValue(mockUser); // Mock user found

      const res = await request(app).post('/auth/login').send({
        email: 'testuser@example.com',
        password: 'wrongpassword',
      });

      expect(res.status).toBe(400);
      expect(res.body.msg).toBe('Password incorrect');
    });
  });
});
