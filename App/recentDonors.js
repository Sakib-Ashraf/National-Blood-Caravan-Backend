const handleRecentDonors = (req, res, db) => {
	const { id, name } = req.params;
	db.select('*')
		.from('donors')
		.then((donor) => {
			const filteredDonors = donor.slice(Math.max(donor.length - 10));
			if (donor.length) {
				res.json(filteredDonors);
			} else {
				res.status(400).json({message:'donor not found'});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(404).json({message:'Error getting donor'});
		});
};

module.exports = {
	handleRecentDonors,
};
