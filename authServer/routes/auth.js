const express = require ('express') 
const bcrypt = require ('bcrypt.js')
const jwt = require ('jsonwebtoken')
const crypto = require('crypto');
const User = require('../models/user')

//express router instance
const router = express.Router();

//in-memory store for authorisation codes
const authCodes = new map();

//registration route 
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    //Check if user exisits 
    const storedUser = await User.findOne({email});
    if (storedUser) return res.status(400).json({msg: 'User already exsists'});

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    //Create the new user
    const newUser = new User({username, email, password:hashedPassword});
    await newUser.save();

    res.status(201).json({msg: 'User registration successful'});
});

//Login route 
router.post('/login', async (req, res) => {
    const {username, password} = req.body;

//Validate user credentials
const user = User.findOne({email});
if (!user) return res.status(400).json({msg: 'Email not found'});

const isMatch = await bcrypt.compare(password, userPassword);
if(!isMatch) return res.status(400).json({msg: 'Password Incorrect'});

//the jwt is the auth code 
const authorizationCode = crypto.randomBytes(20).toString('hex')
authCodes.set(authorizationCode, {userId:userId, expires: Date.now() + 600000 });

res.json({authorizationCode});

});

//exchange the auth for access token 
router.post('/token', async (req, res) => {
    const {authorizationCode} = req.body

    const authCodeData = authCodes.get(authorizationCode);
    if(!authCodeData || authCodeData.expires < Date.now()){
        return res.status(400).json({msg: "invaild or expired authorisation code"});
    }

    authCodes.delete(authorisationCode);

    //create access token
    const accessToken = jwt.sign({id: authCodeData.userId}, 'access_token_secret', {expiresIn: '10m'});

    res.json({accessToken});

});

module.exports = router;