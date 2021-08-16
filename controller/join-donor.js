const handleJoinDonor = (req, res, db, bcrypt) => {
	const { name, username, mobileNo, birthDate, bloodGroup, gender, district, address, lastDonateDate, password, conPassword } = req.body;
	if (
		!name ||
		!username ||
		!mobileNo ||
		!birthDate ||
		!bloodGroup ||
		!gender ||
		!district ||
		!address ||
		!lastDonateDate ||
		!password ||
		!conPassword
	) {
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password);
	db.transaction((trx) => {
		trx.insert({
			hash: hash,
			mobileNo: mobileNo,
		})
			.into('login')
			.returning('mobileNo')
			.then((loginMobileNO) => {
				return trx('users')
					.returning('*')
					.insert({
						name: name,
						mobileNo: loginMobileNO[0],
						joined: new Date(),
					})
					.then((user) => {
						res.json(user[0]);
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
