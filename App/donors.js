const handleAllDonors = (req, res, db) => {
	db.select('*')
		.from('donors')
		.then((donor) => {
			if (donor.length) {
				res.json(donor);
			} else {
				res.status(400).json({message:'donor not found'});
			}
		})
		.catch((err) => {
			res.status(404).json({message:'Error getting donor'});
		});
};

module.exports = {
	handleAllDonors,
};
