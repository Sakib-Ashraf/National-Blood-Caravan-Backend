const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controller/register');
const joinDonor = require('./controller/join-donor');
const LogIn = require('./controller/LogIn');
const donors = require('./controller/donors');
const search = require('./controller/search');
const profile = require('./controller/profile');
const reqForBlood = require('./controller/ReqForBlood');
const recovery = require('./controller/recovery');
const recentDonors = require('./controller/recentDonors');
const bloodGroup = require('./controller/bloodGroup');
const knex = require('knex');
 

//DATABASE CONNECTION
const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1', //localhost
		user: 'postgres', //add your user name for the database here
		password: 'postgreSQL', //add your correct password in here
		database: 'nbc', //add your database name you created here
	},
});

db.select('*').from('users').then(data => console.log(data));


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

app.post('/login', (req, res) => {
    LogIn.handleLogIn(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

app.post('/join-donor', (req, res) => {
    joinDonor.handleJoinDonor(req, res, db, bcrypt);
});

app.post('/reqforblood', (req, res) => {
    reqForBlood.handleReqForBlood(req, res, db, bcrypt);
});

app.post('/recovery', (req, res) => {
    recovery.handleRecovery(req, res, db, bcrypt);
});

app.get('/recent-donors', (req, res) => {
    recentDonors.handleRecentDonors(req, res, db);
});

app.get('/donors', (req, res) => {
    donors.handleDonors(req, res, db);
});

app.get('/bgcard/:bg-group', (req, res) => {
    bloodGroup.handleBloodGroup(req, res, db);
});

app.get('/search', (req, res) => {
    search.handleSearch(req, res, db);
});

app.get('/donor-profile/:id/:name', (req, res) => {
    profile.handleProfile(req, res, db);
});



app.listen(3300, () => {
    console.log(`app is running successfully on port 3300`);
});
