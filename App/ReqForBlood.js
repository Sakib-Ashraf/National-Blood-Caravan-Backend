const handleReqForBlood = (req, res, db) => {
	const {
		name,
		mobile,
		email,
		age,
		blood_group,
		gender,
		area,
		address,
		number_of_units,
		illness,
		hospital_address,
		message,
	} = req.body;

	console.log(req.body);

	if (
		!name ||
		!mobile ||
		!age ||
		!blood_group ||
		!gender ||
		!area ||
		!number_of_units ||
		!illness ||
		!hospital_address
	) {
		return res.status(400).json('incorrect form submission');
	}
	db.insert({
			name: name,
			mobile: mobile,
			email: email,
			age: age,
			blood_group: blood_group,
			gender: gender,
			area: area,
			address: address,
			number_of_units: number_of_units,
			illness: illness,
			hospital_address: hospital_address,
			message: message,
			requested_on: new Date(),
	})
		.into('blood_requests')
		.returning('*')
		.then((resp) => {
			res.status(200).json(resp[0]);
			console.log('success');
		})
		.catch((err) =>
			res.status(400).json('Wrong info or already requested')
		);
};

const handleReq = (req, res, db,) => {
	db.select('*')
		.from('blood_requests')
		.then((data) => {
			if (data.length) {
				res.json(data);
			} else {
				res.status(400).json('Blood Request Data not Found!');
			}
		})
		.catch((err) => {
			res.status(404).json(err, 'Error getting Requested Data!');
		});
};

module.exports = {
	handleReqForBlood,
	handleReq,
};
