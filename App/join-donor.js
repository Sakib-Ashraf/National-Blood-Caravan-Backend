const handleJoinDonor = (req, res, db, bcrypt) => {
	const { name, username, mobile, email, age, blood_group, donated, gender, area, address, last_donate_date, password } = req.body;
	if (
		!name ||
		!username ||
		!mobile ||
		!age ||
		!blood_group ||
		!gender ||
		!area ||
		!address ||
		!last_donate_date ||
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
			.into('donorslogin')
			.returning('mobile')
			.then((loginMobile) => {
				return trx('donors')
					.returning('*')
					.insert({
						name: name,
						username: username,
						mobile: loginMobile[0],
						email: email,
						age: age,
						blood_group: blood_group,
						donated: donated,
						gender: gender,
						area: area,
						address: address,
						last_donate_date: last_donate_date,
						joined: new Date(),
					})
					.then((donor) => {
						console.log(donor);
						res.json(donor[0]);
					})
					.then(trx.commit)
					.catch(trx.rollback);
			})
			.catch((err) =>
				res.status(400).json('Wrong info or already registered')
			);
	}).catch((err) => res.status(400).json('Unable to register'));
};

module.exports = {
	handleJoinDonor,
};
