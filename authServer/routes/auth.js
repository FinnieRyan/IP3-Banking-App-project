import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../../server/models/user.js';


//express router instance
const router = express.Router();

//in-memory store for authorisation codes
const authCodes = new Map();

//registration route 
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    //Check if user exisits 
    const storedUser = await User.findOne({username});
    if (storedUser) return res.status(400).json({msg: 'User already exsists'});

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create the new user
    const newUser = new User({username, email, passwordHash:hashedPassword});
    await newUser.save();

    res.status(201).json({msg: 'User registration successful'});
});

//Login route 
router.post('/login', async (req, res) => {
    const {username, password} = req.body;

//Validate user credentials
console.log(username);
const user = await User.findOne({ username });
if (!user) return res.status(400).json({msg: 'username not found'});

console.log(password);
console.log(user.passwordHash);
const isMatch = await bcrypt.compare(password, user.passwordHash);
if(!isMatch) return res.status(400).json({msg: 'Password Incorrect'});

//the jwt is the auth code 
const authorizationCode = crypto.randomBytes(20).toString('hex')
authCodes.set(authorizationCode, { userId: user._id, expires: Date.now() + 600000 });

res.json({authorizationCode});

});

//exchange the auth for access token 
router.get('/token', async (req, res) => {
    const {authorizationCode} = req.body

    const authCodeData = authCodes.get(authorizationCode);
    if(!authCodeData || authCodeData.expires < Date.now()){
        return res.status(400).json({msg: "invaild or expired authorisation code"});
    }

    authCodes.delete(authorizationCode);

    //create access token
    const accessToken = jwt.sign({id: authCodeData.userId}, 'access_token_secret', {expiresIn: '10m'});

    res.json({accessToken});

});

export default router;