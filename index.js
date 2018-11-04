const controller = require('./controller');
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const dotenv = require('dotenv').config();
const cors = require('cors');
const session = require('express-session');

const app = express();

massive(process.env.DBH)
  .then(db => {
    app.set('db',db);})
  .catch(err => {
    console.log(err);})

app.use(bodyParser.json());
app.use(cors({origin: ['http://localhost:3000']}));
app.use(session({
  secret: process.env.SEC,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.static('./build'));

app.get('/health', controller.getHealth);

app.post('/registration',controller.postRegistration);

app.post('/user-login',controller.postLogin);

app.post('/pic',controller.postPic);

app.get('/posts',controller.getPosts);

app.get('/searchposts',controller.searchPosts);

app.get('/post/:id',controller.getPost);

app.post('/post',controller.newPost);

app.post('/logout',controller.logout);

app.get('/api/auth/me',controller.getApiAuthMe);

app.get('/session',controller.getSession);

app.listen(process.env.PORT || 8080);
