import express from 'express';
import auth from '../middleware/auth.js';
import customerRoutes from './customerRoutes.js';
import accountRoutes from './accountRoutes.js';

const router = express.Router();

router.get('/protected', auth, (req, res) => {
  res.json({ msg: 'Access to protected resource granted' });
});

router.use('/customers', auth, customerRoutes);
router.use('/accounts', auth, accountRoutes);

export default router;
