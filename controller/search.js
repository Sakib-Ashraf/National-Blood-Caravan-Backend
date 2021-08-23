const handleSearch = (req, res, db) => {
	const { area, blood_group } = req.body;
	db.select('*')
		.from('donors')
		.where({
			area,
			blood_group
		})
		.then((donor) => {
			if (donor.length) {
				res.json(donor);
			} else {
				res.status(400).json('donor not found');
			}
		})
		.catch((err) => {
			res.status(404).json(err,'Error getting donor');
		});
};

module.exports = {
	handleSearch,
};
