const handleUserRecovery = (req, res, db, bcrypt) => {
	const { mobile, NewPassword } = req.body;

	console.log(req.body, req.params);
	if (!mobile || !NewPassword) {
		return res.status(400).json({ message: 'incorrect form submission' });
	}

db.select('*').from('userslogin')
	.where({ mobile: mobile })
	.then((data) => {
            const hash = bcrypt.hashSync(NewPassword);
			return db
				.from('userslogin')
				.where({ mobile: mobile })
				.update({
					hash: hash,
				})
				.then((user) => {
					res.status(200).json({
						message: 'Success!',
					});
				})
				.catch((err) =>
					res.status(400).json({ message: 'User not found!' })
				);
	})
.catch((err) => {
	res.status(404).json({ message: 'Error Changing Password' });
});
};

const handleDonorRecovery = (req, res, db, bcrypt) => {
	const { mobile, NewPassword } = req.body;

	console.log(req.body, req.params);
	if (!mobile || !NewPassword) {
		return res.status(400).json({ message: 'incorrect form submission' });
	}

db.select('*').from('donorslogin')
	.where({ mobile: mobile })
	.then((data) => {
            const hash = bcrypt.hashSync(NewPassword);
			return db
				.from('donorslogin')
				.where({ mobile: mobile })
				.update({
					hash: hash,
				})
				.then((user) => {
					res.status(200).json({
						message: 'Success!',
					});
				})
				.catch((err) =>
					res.status(400).json({ message: 'User not found!' })
				);
		
	})
.catch((err) => {
	res.status(404).json({ message: 'Error Changing Password' });
});
};

module.exports = {
	handleUserRecovery,
	handleDonorRecovery,
};
