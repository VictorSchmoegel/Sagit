const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const testRoute = require('./api/routes/test.route');

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Failed to connect to MongoDB', err);
});

const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use('/api', testRoute);