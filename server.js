const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controller/register');
const joinDonor = require('./controller/join-donor');
const LogIn = require('./controller/LogIn');
const donors = require('./controller/donors');
const search = require('./controller/search');
const BGSearch = require('./controller/BGSearch');
const profile = require('./controller/profile');
const UpdateProfile = require('./controller/updateProfile');
const reqForBlood = require('./controller/ReqForBlood');
const recovery = require('./controller/recovery');
const recentDonors = require('./controller/recentDonors');
const bloodGroup = require('./controller/bloodGroup');
const knex = require('knex');
const authJwt = require('./controller/auth/authJwt');
 

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


const app = express();

//MIDDLEWARE

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
 app.use(function (req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		);
		next();
 });



//TESTING
app.get('/', (req, res) => {
	res.send('Success');
});



// RESTFUL API

app.post('/login',  (req, res) => {
	LogIn.handleLogIn(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

app.post('/join-donor', (req, res) => {
    joinDonor.handleJoinDonor(req, res, db, bcrypt);
});

app.post('/reqforblood', [authJwt.verifyToken], (req, res) => {
	reqForBlood.handleReqForBlood(req, res, db, bcrypt);
});

app.post('/recovery', (req, res) => {
    recovery.handleRecovery(req, res, db, bcrypt);
});

app.get('/recent-donors', (req, res) => {
    recentDonors.handleRecentDonors(req, res, db);
});

app.get('/donors', (req, res) => {
    donors.handleAllDonors(req, res, db);
});

app.get('/bgcard/:bg-group', (req, res) => {
    bloodGroup.handleBloodGroup(req, res, db);
});

app.get('/search/:area/:blood_group/:gender', (req, res) => {
	search.handleSearch(req, res, db);
});

app.get('/donors/:bg', (req, res) => {
    BGSearch.handleBGSearch(req, res, db);
});

app.get('/donors/profile/:id', [authJwt.verifyToken], (req, res) => {
	profile.handleProfile(req, res, db);
});


app.put('/donors/profile/update/:id', [authJwt.verifyToken], (req, res) => {
	UpdateProfile.handleUpdateProfile(req, res, db);
});



app.listen(3300, () => {
    console.log(`app is running successfully on port 3300`);
});
