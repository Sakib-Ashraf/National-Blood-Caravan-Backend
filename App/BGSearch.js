const handleBGSearch = (req, res, db) => {
    const {bg} = req.params;
	db.select('*')
		.from('donors')
		.where({
			blood_group: bg,
		})
		.then((donor) => {
			console.log(donor);
			if (donor.length) {
				res.json(donor);
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
	handleBGSearch,
};
