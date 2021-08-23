const handleUpdateProfile = (req, res, db) => {
	const {
		id,
		name,
		seconds,
		donated,
		last_donate_date,
		disablervalue,
	} = req.body;

	console.log(req.body);

	db.from('donors')
		.where({
			id,
			name,
		})
		.update({ seconds, donated, last_donate_date, disablervalue })
		.then((resp) => {
			if (resp) {
				res.json(resp);
			} else {
				res.status(400).json(resp);
			}
		})
		.catch((err) => {
			res.status(404).json(err, 'Error Updating Profile');
		});
};

module.exports = {
	handleUpdateProfile,
};
