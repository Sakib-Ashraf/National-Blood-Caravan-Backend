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
const EditProfile = require('./App/EditProfile');
const ChangePassword = require('./App/ChangePassword');
const recovery = require('./App/recovery');
const reqForBlood = require('./App/ReqForBlood');
const recentDonors = require('./App/recentDonors');
const bloodGroup = require('./App/bloodGroup');
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
app.get('/api', (req, res) => {
	res.send('Success');
});

// [authJwt.verifyToken],

// RESTFUL API

app.post('/api/user-login', (req, res) => {
	LogIn.handleUserLogIn(req, res, db, bcrypt);
});

app.post('/api/donor-login', (req, res) => {
	LogIn.handleDonorLogIn(req, res, db, bcrypt);
});

app.post('/api/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

app.post('/api/join-donor', (req, res) => {
    joinDonor.handleJoinDonor(req, res, db, bcrypt);
});

app.post('/api/blood-request',  (req, res) => {
	reqForBlood.handleReqForBlood(req, res, db);
});

app.get('/api/reqbginfo',  (req, res) => {
	reqForBlood.handleReq(req, res, db);
});
app.get('/api/users/request/:id', (req, res) => {
	reqForBlood.handleReqData(req, res, db);
});

app.put('/api/user-recovery', (req, res) => {
    recovery.handleUserRecovery(req, res, db, bcrypt);
});

app.put('/api/donor-recovery', (req, res) => {
    recovery.handleDonorRecovery(req, res, db, bcrypt);
});

app.get('/api/recent-donors', (req, res) => {
    recentDonors.handleRecentDonors(req, res, db);
});

app.get('/api/donors', (req, res) => {
    donors.handleAllDonors(req, res, db);
});

app.get('/api/bgcard/:bg-group', (req, res) => {
    bloodGroup.handleBloodGroup(req, res, db);
});

app.get('/api/search/:area/:blood_group/:gender', (req, res) => {
	search.handleSearch(req, res, db);
});

app.get('/api/donors/:bg', (req, res) => {
    BGSearch.handleBGSearch(req, res, db);
});

app.get('/api/donors/profile/:id',  (req, res) => {
	profile.handleProfile(req, res, db);
});


app.put('/api/donors/profile/update/:id',  (req, res) => {
	UpdateProfile.handleUpdateProfile(req, res, db);
});

app.put('/api/donors/profile/edit/:id',  (req, res) => {
	EditProfile.handleEditProfile(req, res, db);
});

app.put('/api/donors/profile/user-change-password/:id',  (req, res) => {
	ChangePassword.handleUserChangePassword(req, res, db, bcrypt);
});
app.put('/api/donors/profile/donor-change-password/:id',  (req, res) => {
	ChangePassword.handleDonorChangePassword(req, res, db, bcrypt);
});


const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`app is running successfully on port 3300`);
});
