const controller = require('./controller');
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const app = express();

app.use(bodyParser.json());

massive(process.env.DBH)
  .then(db => {
    app.set('db',db);})
  .catch(err => {
    console.log(err);})

app.get('/health', controller.getHealth);

app.listen(8080);
