import express from 'express';
import transactionController from '../controllers/transactionController.js';

const Router = express.Router();

Router.route('/:accountId').get(
  transactionController.getTransactionsByAccountId
);
Router.route('/').get(transactionController.getAllTransactions);

export default Router;
