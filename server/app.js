const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoute = require('./route/userRoute');
const courseRoute = require('./route/courseRoute');
const categoryRoute = require('./route/categoryRoute');
const topicRoute = require('./route/topicRoute');

const app = express();
app.use(cors());

app.use(bodyParser.json())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  })
);

// routes
app.use('/user',userRoute);
app.use('/course',courseRoute);
app.use('/category',categoryRoute);
app.use('/topic',topicRoute);
module.exports = app;