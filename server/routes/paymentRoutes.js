import express from 'express';
import paymentController from '../controllers/paymentController.js';

const Router = express.Router();

Router.route('/').post(paymentController.createPayment);
Router.route('/:accountNumber').post(paymentController.createPayment);

export default Router;
