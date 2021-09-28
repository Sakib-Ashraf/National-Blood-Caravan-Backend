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
		return res.status(400).json({message: 'incorrect form submission'});
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
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({ message: 'Wrong info or already requested' });
		}
		);
};

const handleReq = (req, res, db,) => {
	db.select('*')
		.from('blood_requests')
		.then((data) => {
			const filteredData = data.slice(Math.max(data.length - 10));
			if (data.length) {
				res.json(filteredData);
			} else {
				res.status(400).json({message: 'Blood Request Data not Found!'});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(404).json( {message: 'Error getting Requested Data!'});
		});
};

const handleReqData = (req, res, db) => {
	const { id } = req.params;

	db.select('*')
		.from('blood_requests')
		.where({
			id,
		})
		.then((data) => {
			console.log(data);
			if (data.length) {
				res.json(data[0]);
			} else {
				res.status(400).json({message : 'data not found'});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(404).json({message : 'Error getting data'});
		});
};

module.exports = {
	handleReqForBlood,
	handleReq,
	handleReqData
};
