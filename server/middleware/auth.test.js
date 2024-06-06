import jwt from 'jsonwebtoken';
import request from 'supertest';
import express from 'express';
import authMiddleware from '../middleware/auth.js';

const app = express();

app.use(authMiddleware);

// Mock JWT token generation function
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('Auth Middleware', () => {
  it('should return 401 if no token is provided', async () => {
    const response = await request(app).get('/protected-route');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ msg: 'No token to complete request' });
  });

  it('should return 401 if token is invalid', async () => {
    jwt.verify.mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await request(app)
      .get('/protected-route')
      .set('x-auth-token', 'invalid-token');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ msg: 'Token is not valid' });
  });

  it('should call next middleware if token is valid', async () => {
    const mockUser = {
      id: '123',
      username: 'testuser',
    };

    jwt.verify.mockReturnValue(mockUser);

    const nextMock = jest.fn();
    const req = {
      header: jest.fn().mockReturnValue('valid-token'),
    };
    const res = {};
    authMiddleware(req, res, nextMock);

    expect(req.user).toEqual(mockUser);
    expect(nextMock).toHaveBeenCalled();
  });
});
