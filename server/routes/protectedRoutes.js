const express = require('express');
const auth = require('../../authServer/middleware/auth');

const router = express.Router();

router.get('/protected', auth, (req, res) => {
    res.json({msg: 'Access to protected resource granted'})
});

module.exports = router
