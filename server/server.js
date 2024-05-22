const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());


const protectedRoutes = require('./routes/protected');
app.use('/api', protectedRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
