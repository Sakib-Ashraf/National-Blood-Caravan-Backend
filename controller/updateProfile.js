

const handleUpdateProfile = (req, res, db) => {
	const { activation_date, last_donate_date, disablerValue } = req.body;
	const { id} = req.params;

	console.log(req.body);
	if (
		!activation_date ||
		!last_donate_date ||
		!disablerValue
	) {
		return res.status(400).json('incorrect form submission');
	}

	db.from('donors')
		.where({ id })
		.increment('donated', 1)
		.update({
			activation_date: activation_date,
			last_donate_date: last_donate_date,
			disablervalue: disablerValue,
		})
		.returning('*')
		.then((resp) => {
			console.log(resp[0]);
			if (resp) {
				res.json(resp[0]);
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
