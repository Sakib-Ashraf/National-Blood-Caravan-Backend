const handleSearch = (req, res, db) => {
	const { area, blood_group, gender } = req.params;
	db.select('*')
		.from('donors')
		.where({
			area: area,
			blood_group: blood_group,
			gender: gender,
		})
		.then((donor) => {
			const filteredDonor = donor.slice(Math.max(donor.length - 10));
			if (donor.length) {
				res.json(filteredDonor);
			} else {
				res.status(400).json('donor not found');
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(404).json(err, 'Error getting donor');
		});
};

module.exports = {
	handleSearch,
};
