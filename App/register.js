const handleRegister = (req, res, db, bcrypt) => {
	const { name, username, mobile, email, password } = req.body.user;
	
	if (
		!name ||
		!username ||
		!mobile ||
		!email ||
		!password
	) {
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password);
	db.transaction((trx) => {
		trx.insert({
			password: hash,
			name: name,
			username: username,
			mobile: mobile,
			email: email,
			joined: new Date(),
			createdAt: new Date(),
			updatedAt: new Date(),
		})
			.into('users')
			.then((resp) => {
				return trx('users')
					.returning('*')
					.then((user) => {
						res.json(user[0]);
					})
					.then(trx.commit)
					.catch(trx.rollback);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json('Wrong info or already registered');
			});
	}).catch((err) => {
		console.log(err);
		res.status(400).json('Unable to register');
	});
};

module.exports = {
	handleRegister,
};
