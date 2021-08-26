// const handleCounter = (req, res, db) => {
// 	const { id, name } = req.body;
// 	if (!name || !id) {
// 		return res.status(400).json('incorrect request');
// 	}
// 	db('donors')
// 		.where({ id, name })
// 		.increment('donated', 1)
// 		.returning('donated')
// 		.then((donated) => {
// 			res.json(donated[0]);
// 		})
// 		.catch((err) => {
// 			res.status(400).json('Unable to get data');
// 		});
// };

// const handleDisabler = (req, res, db) => {
// 	const { id, name, disablerValue } = req.body;
// 	if (!name || !id) {
// 		return res.status(400).json('incorrect request');
// 	}
// 	db('donors')
// 		.where({ id, name })
// 		.update({ disablervalue: disablerValue })
// 		.returning('disablervalue')
// 		.then((resp) => {
// 			if (resp) {
// 				res.json(resp[0]);
// 			} else {
// 				res.status(400).json(resp);
// 			}
// 		})
// 		.catch((err) => {
// 			res.status(400).json('Unable to get data');
// 		});
// };

const handleUpdateProfile = (req, res, db) => {
	const { seconds, last_donate_date, disablerValue } = req.body;
	const { id} = req.params;

	console.log(req.body);

	db.from('donors')
		.where({ id })
		.increment('donated', 1)
		.update({
			seconds: seconds,
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
