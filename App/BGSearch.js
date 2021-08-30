const handleBGSearch = (req, res, db) => {
    const {bg} = req.params;
	db.select('*')
		.from('donors')
		.where({
			blood_group: bg,
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
	handleBGSearch,
};
