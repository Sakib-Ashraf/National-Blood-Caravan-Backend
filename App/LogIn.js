const jwt = require('jsonwebtoken');
const config = require('./auth/config/auth.config');

const handleLogIn = (req, res, db, bcrypt) => {
	const { mobile, password } = req.body;

	console.log(req.body);

	if (!mobile || !password) {
		return res.status(400).json({ message: 'incorrect form submission' });
	}

	db.select('*')
		.from('login')
		.where('mobile', '=', mobile)
		.then((data) => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid) {
				return (
					db
						.select('*')
						.from('donors')
						// .innerJoin('users', 'users.id', 'donors.id',)
						.where('mobile', '=', mobile)
						.then((user) => {
							var token = jwt.sign(
								{ id: user.id },
								config.secret,
								{
									expiresIn: 86400, // 24 hours
								}
							);
							res.status(200).json({
								user: user[0],
								accessToken: token,
							});
						})
						.catch((err) =>
							res.status(400).json({ message: 'User not found!' })
						)
				);
			} else {
				res.status(401).json({ message: `Didn't Find a Match for Credentials, Try Again!` });
			}
		})
		.catch((err) => res.status(400).json({message: 'wrong credentials'}));
};

module.exports = {
	handleLogIn,
};