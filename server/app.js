const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

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

module.exports = app;