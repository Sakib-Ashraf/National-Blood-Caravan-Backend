const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./App/register');
const joinDonor = require('./App/join-donor');
const LogIn = require('./App/LogIn');
const donors = require('./App/donors');
const search = require('./App/search');
const BGSearch = require('./App/BGSearch');
const profile = require('./App/profile');
const UpdateProfile = require('./App/updateProfile');
const recovery = require('./App/recovery');
const reqForBlood = require('./App/ReqForBlood');
const recentDonors = require('./App/recentDonors');
const bloodGroup = require('./App/bloodGroup');
const knex = require('knex');
const authJwt = require('./App/auth/authJwt');
 

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

app.use(express.urlencoded({extended: true}));
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


const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`app is running successfully on port 3300`);
});
