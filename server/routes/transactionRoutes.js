import express from 'express';
import transactionController from '../controllers/transactionController.js';

const Router = express.Router();

Router.route('/').get(transactionController.getAllTransactions);
Router.route('/:accountId').get(
  transactionController.getTransactionsByAccountId
);
Router.route('/id/:transactionId').get(
  transactionController.getSingleTransaction
);

export default Router;
