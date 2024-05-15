const express = require ('express') 
const bcrypt = require ('bcrypt.js')
const jwt = require ('jsonwebtoken')
const User = require('../models/user')

const router = express.Router();

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

//the jwt is the auth code for now... 
const authorizationCode = jwt.sign({id: user.id}, 'authorizationcode_secret', {expiresIn: '10m'});

res.json({authorizationCode});

});

//exchange the auth for access token 
router.post('/token', async (req, res) => {
const {authorizationCode} = req.body

try{
    const decoded = jwt.verify(authorizationCode, 'authorizationcode_secret');
    const accessToken = jwt.sign({id: decoded.id}, 'access_token_secret', {expiresIn: '10m'});

    res.json({accessToken});
 } catch (err) {
    res.status(400).json({msg: 'Invalid auth code '})
 }

});

module.exports = router;