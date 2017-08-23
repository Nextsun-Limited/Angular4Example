import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';

// Set Server
const app = express();
// Server Port Number
const port = 3000;

// CORS Middleware
app.use(cors());
// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
// BodyParser Middleware
app.use(bodyParser.json());
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./server/config/passport').passportCheck();

// Routes
import users from './server/routes/users'
app.use('/users', users);

import property from './server/routes/zillow'
app.use('/zillow', property);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('Server started at port ' + port);
});
