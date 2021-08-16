const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controller/register');
const joinDonor = require('./controller/join-donor');
const SignIn = require('./controller/signIn');
const donors = require('./controller/donors');
const profile = require('./controller/profile');
const knex = require('knex');
    
// const db = knex({
//     client: 'pg',
//     connection: {
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
// });

const app = express();

//MIDDLEWARE

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


//TESTING
app.get('/', (req, res) => {
	res.send('Success');
});


// RESTFUL API

app.post('/signin', (req, res) => {
    SignIn.handleSignIn(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

app.post('/join-donor', (req, res) => {
    joinDonor.handleJoinDonor(req, res, db, bcrypt);
});

app.get('/donors', (req, res) => {
    donors.handleDonors(req, res, db);
});
app.get('/profile/:id/:name', (req, res) => {
    profile.handleProfile(req, res, db);
});



app.listen(3300, () => {
    console.log(`app is running successfully on port 3300`);
});