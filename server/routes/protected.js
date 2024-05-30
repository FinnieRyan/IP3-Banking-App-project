import express from 'express';
import auth from '../middleware/auth.js';
import customerRoutes from './customerRoutes.js';

const router = express.Router();

router.get('/protected', auth, (req, res) => {
  res.json({ msg: 'Access to protected resource granted' });
});

router.use('/customers', auth, customerRoutes);

export default router;
