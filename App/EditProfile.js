//handle donor profile edit
const handleEditProfile = (req, res, db) => {
    const { name, email, mobile, birth_date, area, address } = req.body;
    const { id } = req.params;

    db.from('donors')
		.where({ id: id })
		.update({
			name: name,
			email: email,
			mobile: mobile,
			birth_date: birth_date,
			area: area,
			address: address,
			updatedAt: new Date(),
		})
		.then((data) => {
			console.log(data);
			return db('donors')
				.returning('*')
				.then((resp) => {
					console.log(resp[0]);
					if (resp) {
						res.json(resp[0]);
					} else {
						res.status(400).json(resp);
					}
				})
				.catch((err) => {
					console.log(err);
					res.status(404).json({
						message: 'Wrong info or already Updated',
					});
				});
		})
		.catch((err) => {
			console.log(err);
			res.status(404).json({ message: 'Error Updating Profile' });
		});
};


module.exports = {
	handleEditProfile,
};
