const handleSearch = (req, res, db) => {
	const { area, blood_group, gender } = req.params;
	console.log(req.params);
	db.select('*')
		.from('donors')
		.where({
			area: area,
			blood_group: blood_group,
			gender: gender,
		})
		.then((donor) => {
			if (donor.length) {
				res.json(donor);
			} else {
				res.status(400).json('donor not found');
			}
		})
		.catch((err) => {
			res.status(404).json(err, 'Error getting donor');
		});
};

module.exports = {
	handleSearch,
};
