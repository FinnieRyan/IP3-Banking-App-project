const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


app.use(bodyParser.json())

//database connection 
mongoose.connect('url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const authRoutes = require ('./routes/auth');
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log (`server running on ${Port}`));