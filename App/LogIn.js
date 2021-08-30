const jwt = require('jsonwebtoken');
const config = require('./auth/config/auth.config');

const handleLogIn = (req, res, db, bcrypt) => {
	const { mobile, password } = req.body;

	console.log(req.body);

	if (!mobile || !password) {
		return res.status(400).json('incorrect form submission');
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
							res.status(200).send({
								user: user[0],
								accessToken: token,
							});
						})
						.catch((err) =>
							res.status(400).json(err, 'User not found')
						)
				);
			} else {
				res.status(400).json(`Didn't find a match`);
			}
		})
		.catch((err) => res.status(400).json(err, 'wrong credentials'));
};

module.exports = {
	handleLogIn,
};
