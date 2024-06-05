import request from 'supertest';
import express from 'express';
import accountRoutes from './accountRoutes.js';
import accountController from '../controllers/accountController.js';

jest.mock('../controllers/accountController.js');

describe('Account Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use('/', accountRoutes);
  });

  it('should get all accounts for a given customer ID', async () => {
    const mockAccounts = [
      { id: '1', balance: 100 },
      { id: '2', balance: 200 },
    ];
    const customerId = '123';

    // Mock the controller method to return mockAccounts
    accountController.getAllCustomerAccounts.mockImplementationOnce(
      (req, res) => {
        res.json(mockAccounts);
      }
    );

    // Make a request to the route with a specific customer ID
    const response = await request(app).get(`/${customerId}`);

    // Assert that the response status is 200
    expect(response.status).toBe(200);

    // Assert that the response body matches the mockAccounts
    expect(response.body).toEqual(mockAccounts);
  });
});
