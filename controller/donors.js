const handleDonors = (req, res, db) => {
	const { id, name } = req.params;
	db.select('*')
		.from('users')
		.where({
			id,
			name,
		})
		.then((user) => {
			if (user.length) {
				res.json(user[0]);
			} else {
				res.status(400).json('user not found');
			}
		})
		.catch((err) => {
			res.status(404).json('Error getting user');
		});
};

module.exports = {
	handleDonors,
};
