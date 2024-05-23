const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


app.use(bodyParser.json())

//database connection 
mongoose.connect('mongodb+srv://dudge1:ip3bank@bank-app-ip3.yodwqq8.mongodb.net/IP3DB?retryWrites=true&w=majority&appName=Bank-App-IP3', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const authRoutes = require ('./routes/auth');
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log (`server running on ${PORT}`));