import request from 'supertest';
import express from 'express';
import customerRoutes from './customerRoutes.js';
import customerController from '../controllers/customerController.js';

jest.mock('../controllers/customerController.js');

describe('Customer Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use('/', customerRoutes);
  });

  it('should get single customer by ID', async () => {
    const mockCustomer = { id: '1', name: 'John Doe' };
    customerController.getSingleCustomer.mockImplementationOnce((req, res) => {
      res.json(mockCustomer);
    });

    const response = await request(app).get('/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCustomer);
  });

  it('should get all customers', async () => {
    const mockCustomers = [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Doe' },
    ];
    customerController.getAllCustomers.mockImplementationOnce((req, res) => {
      res.json(mockCustomers);
    });

    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCustomers);
  });
});
