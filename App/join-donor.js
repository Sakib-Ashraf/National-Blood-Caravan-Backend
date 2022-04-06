const handleJoinDonor = (req, res, db, bcrypt) => {
	const { name, username, mobile, email, age, birth_date, blood_group, donated, gender, area, address, last_donate_date, password, activation_date } = req.body.donor;
	if (
		!name ||
		!username ||
		!mobile ||
		!age ||
		!birth_date ||
		!blood_group ||
		!gender ||
		!area ||
		!address ||
		!password
	) {
		return res.status(400).json({message: 'incorrect form submission'});
	}
	const hash = bcrypt.hashSync(password);
	db.transaction((trx) => {
		trx.insert({
			password: hash,
			name: name,
			username: username,
			mobile: mobile,
			email: email,
			age: age,
			birth_date: birth_date,
			blood_group: blood_group,
			donated: donated,
			gender: gender,
			area: area,
			address: address,
			last_donate_date: last_donate_date,
			joined: new Date(),
			createdAt: new Date(),
			updatedAt: new Date(),
			activation_date: null,
		})
			.into('donors')
			.then(donordata => {
				return trx('donors')
					.returning('*')
					.then((donor) => {
						res.json(donor[0]);
					})
					.then(trx.commit)
					.catch(trx.rollback);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json({
					message: 'Wrong info or already registered',
				});
			});
	}).catch((err) => {
		console.log(err);
		res.status(400).json({ message: 'Unable to register' });
	});
};

module.exports = {
	handleJoinDonor,
};
