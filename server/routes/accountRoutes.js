import express from 'express';
import accountController from '../controllers/accountController.js';

const Router = express.Router();

Router.route('/:id').get(accountController.getSingleAccount);

export default Router;
