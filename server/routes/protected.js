import express from 'express'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/protected', auth, (req, res) => {
  res.json({ msg: 'Access to protected resource granted' })
})

export default router
