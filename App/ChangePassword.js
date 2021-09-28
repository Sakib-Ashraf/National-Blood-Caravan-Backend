const handleDonorChangePassword = (req, res, db, bcrypt) => {
	const { OldPassword, NewPassword } = req.body;
	const { id } = req.params;

	console.log(req.body, req.params);
	if (!OldPassword || !NewPassword) {
		return res.status(400).json({ message: 'incorrect form submission' });
	}

db.select('*').from('donorslogin')
	.where({ id: id })
	.then((data) => {
		const isValid = bcrypt.compareSync(OldPassword, data[0].hash);
        if (isValid) {
            const hash = bcrypt.hashSync(NewPassword);
			return db
				.from('donorslogin')
				.where({ id: id })
				.update({
					hash: hash,
				})
				.then((user) => {
					res.status(200).json({
						message: 'Success!',
					});
				})
				.catch((err) => {
					console.log(err);
					res.status(400).json({ message: 'User not found!' });
				}
				);
		} else {
			res.status(401).json({
				message: `Didn't Find a Match for Credentials, Try Again!`,
			});
		}
	})
		.catch((err) => {
			console.log(err);
			res.status(404).json({ message: 'Error Updating Profile' });
		});
};

const handleUserChangePassword = (req, res, db, bcrypt) => {
	const { OldPassword, NewPassword } = req.body;
	const { id } = req.params;

	console.log(req.body, req.params);
	if (!OldPassword || !NewPassword) {
		return res.status(400).json({ message: 'incorrect form submission' });
	}

db.select('*').from('userslogin')
	.where({ id: id })
	.then((data) => {
		const isValid = bcrypt.compareSync(OldPassword, data[0].hash);
        if (isValid) {
            const hash = bcrypt.hashSync(NewPassword);
			return db
				.from('userslogin')
				.where({ id: id })
				.update({
					hash: hash,
				})
				.then((user) => {
					res.status(200).json({
						message: 'Success!',
					});
				})
				.catch((err) => {
					console.log(err);
					res.status(400).json({ message: 'User not found!' });
				});
		} else {
			res.status(401).json({
				message: `Didn't Find a Match for Credentials, Try Again!`,
			});
		}
	})
	.catch((err) => {
			console.log(err);
			res.status(404).json({ message: 'Error Updating Profile' });
		});
};

module.exports = {
	handleUserChangePassword,
	handleDonorChangePassword,
};
