import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../../database/models/user.js';

//express router instance
const router = express.Router();

//in-memory store for authorisation codes
const authCodes = new Map();

//registration route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  //Check if user exists
  const storedUser = await User.findOne({ username });
  if (storedUser) return res.status(400).json({ msg: 'User already exists' });

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create the new user
  const newUser = new User({ username, email, passwordHash: hashedPassword });
  await newUser.save();

  res.status(201).json({ msg: 'User registration successful' });
});

//Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ msg: 'Username not found' });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(400).json({ msg: 'Password incorrect' });

  // Generate authorization code
  const authorizationCode = crypto.randomBytes(20).toString('hex');
  authCodes.set(authorizationCode, {
    userId: user._id,
    expires: Date.now() + 600000, // 10 minutes expiry
  });

  // Immediately exchange authorization code for access token
  const authCodeData = authCodes.get(authorizationCode);
  if (!authCodeData || authCodeData.expires < Date.now()) {
    return res
      .status(400)
      .json({ msg: 'Invalid or expired authorization code' });
  }

  // Remove the auth code from the store after it has been used
  authCodes.delete(authorizationCode);

  // Generate access token
  const accessToken = jwt.sign(
    { id: authCodeData.userId },
    'access_token_secret',
    { expiresIn: '1h' }
  );

  res.json({
    accessToken,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

export default router;
