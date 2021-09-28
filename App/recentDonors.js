const handleRecentDonors = (req, res, db) => {
	const { id, name } = req.params;
	db.select('*')
		.from('users')
		.where({
			id,
			name,
		})
		.then((user) => {
			const filteredUser = user.slice(Math.max(user.length - 10));
			console.log(filteredUser);
			if (user.length) {
				res.json(filteredUser);
			} else {
				res.status(400).json({message:'user not found'});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(404).json({message:'Error getting user'});
		});
};

module.exports = {
	handleRecentDonors,
};
