import express from 'express';
import transactionController from '../controllers/transactionController.js';

const Router = express.Router();

Router.route('/:id').get(transactionController.getAllTransactions);

export default Router;
