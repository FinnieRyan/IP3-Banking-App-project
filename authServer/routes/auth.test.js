import request from 'supertest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import express from 'express';
import router from './auth.js';

// Mock User model
jest.mock('../../server/models/user.js', () => {
  const actual = jest.requireActual('../../server/models/user.js');
  return {
    ...actual,
    default: jest.fn().mockImplementation((userData) => ({
      ...userData,
      save: jest.fn().mockResolvedValue(),
    })),
    findOne: jest.fn(),
  };
});

import User from '../../server/models/user.js';

const app = express();
app.use(express.json());
app.use('/', router);

describe('Auth routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /login', () => {
    test('should login a user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'testpassword',
      };

      User.findOne.mockResolvedValueOnce({
        _id: 'user_id',
        username: 'testuser',
        email: userData.email,
        passwordHash: 'hashedPassword',
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      crypto.randomBytes = jest
        .fn()
        .mockReturnValue(Buffer.from('authorizationCode'));
      jwt.sign = jest.fn().mockReturnValue('accessToken');

      const response = await request(app)
        .post('/login')
        .send(userData)
        .expect(200);

      expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        userData.password,
        'hashedPassword'
      );
      expect(crypto.randomBytes).toHaveBeenCalledWith(20);
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 'user_id' },
        'access_token_secret',
        { expiresIn: '1h' }
      );
      expect(response.body.accessToken).toBe('accessToken');
      expect(response.body.user).toEqual({
        id: 'user_id',
        username: 'testuser',
        email: userData.email,
      });
    });
  });
});
