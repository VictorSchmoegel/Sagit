const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const userRoute = require('./api/routes/user.route');
const authRoute = require('./api/routes/auth.route');
const projectRoute = require('./api/routes/project.route');
const colabRoute = require('./api/routes/colab.route');
const fileRoute = require('./api/routes/pdf.route');

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
app.use('/api', authRoute);
app.use('/api', projectRoute);
app.use('/api', colabRoute);
app.use('/api', fileRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});