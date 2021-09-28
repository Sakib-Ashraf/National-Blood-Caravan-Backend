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
			hash: hash,
			mobile: mobile,
			email: email,
		})
			.into('userslogin')
			.returning('mobile')
			.then((loginMobile) => {
				return trx('users')
					.returning('*')
					.insert({
						name: name,
						username: username,
						mobile: loginMobile[0],
						email: email,
						joined: new Date(),
					})
					.then((user) => {
						res.json(user[0]);
					})
					.then(trx.commit)
					.catch(trx.rollback);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json('Wrong info or already registered');
			}
			);
	}).catch((err) => {
		console.log(err);
		res.status(400).json('Unable to register');
	});
};

module.exports = {
	handleRegister,
};
