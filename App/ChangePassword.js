const handleChangePassword = (req, res, db, bcrypt) => {
	const { OldPassword, NewPassword } = req.body;
	const { id } = req.params;

	console.log(req.body, req.params);
	if (!OldPassword || !NewPassword) {
		return res.status(400).json({ message: 'incorrect form submission' });
	}

db.select('*').from('login')
	.where({ id: id })
	.then((data) => {
		const isValid = bcrypt.compareSync(OldPassword, data[0].hash);
        if (isValid) {
            const hash = bcrypt.hashSync(NewPassword);
			return db
				.from('login')
				.where({ id: id })
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
		} else {
			res.status(401).json({
				message: `Didn't Find a Match for Credentials, Try Again!`,
			});
		}
	})



	// db.from('login')
	// 	.where({ id: id })
	// 	.update({
	// 		email: email,
	// 		mobile: mobile,
	// 	})
	// 	.returning('mobile')
	// 	.then((loginMobile) => {
	// 		return db('donors')
	// 			.where({ id: id })
	// 			.update({
	// 				name: name,
	// 				email: email,
	// 				mobile: loginMobile[0],
	// 				birth_date: birth_date,
	// 				area: area,
	// 				address: address,
	// 			})
	// 			.returning('*')
	// 			.then((resp) => {
	// 				console.log(resp[0]);
	// 				if (resp) {
	// 					res.json(resp[0]);
	// 				} else {
	// 					res.status(400).json(resp);
	// 				}
	// 			})
	// 			.catch((err) => {
	// 				res.status(404).json({
	// 					message: 'Wrong info or already Updated',
	// 				});
	// 			});
	// 	})
		.catch((err) => {
			res.status(404).json({ message: 'Error Updating Profile' });
		});
};

module.exports = {
	handleChangePassword,
};
