const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const userRoute = require('./api/routes/user.route');


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Failed to connect to MongoDB', err);
});

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use('/api', userRoute);