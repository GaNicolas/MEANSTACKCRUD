require('./config/config');
require('./models/db');
require('./config/passportConfig');

var usercontroller = require('./controllers/user.controller');
var userListecontroller = require('./controllers/listusercontroller');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api',rtsIndex);

//lancement serveur
app.listen(process.env.PORT, ()=> console.log(`Server started at port : ${process.env.PORT}`));

app.use('/users',userListecontroller);
