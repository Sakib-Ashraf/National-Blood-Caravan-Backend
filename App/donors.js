const handleAllDonors = (req, res, db) => {
	db.select('*')
		.from('donors')
		.then((donor) => {
			const filteredDonor = donor.slice(Math.max(donor.length - 20));
			if (donor.length) {
				res.json(filteredDonor);
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
	handleAllDonors,
};
