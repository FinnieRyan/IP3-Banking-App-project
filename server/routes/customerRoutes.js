import express from 'express';
import customerController from '../controllers/customerController.js';

const Router = express.Router();

Router.route('/:id').get(customerController.getSingleCustomer);

export default Router;
