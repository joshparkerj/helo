const controller = require('./controller');
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors({origin: ['http://localhost:3000']}));

massive(process.env.DBH)
  .then(db => {
    app.set('db',db);})
  .catch(err => {
    console.log(err);})

app.get('/health', controller.getHealth);

app.post('/registration',controller.postRegistration);

app.post('/login',controller.postLogin);

app.listen(8080);
