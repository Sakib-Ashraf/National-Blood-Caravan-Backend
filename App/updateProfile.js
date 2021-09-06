const dateConverter = (timestampData) => {
		const date = new Date(timestampData);
		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		let dt = date.getDate();

		if (dt < 10) {
			dt = Number('0' + dt);
		}
		if (month < 10) {
			month = Number('0' + month);
		}

		const finalDate = dt + '-' + month + '-' + year;
		return finalDate;
	};

const addDays = (days) => {
		var result = new Date();
		result.setDate(result.getDate() + days);
		return result;
	};
let addDaysAns = dateConverter(addDays(90));


const last_donate_date = () => {
		let date = new Date();
		let dateFormate =
			date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
		let monthFormate =
			date.getMonth() > 8 ?
				date.getMonth() + 1 : '0' + (date.getMonth() + 1);
		let formattedTime =
			dateFormate + '-' + monthFormate + '-' + date.getFullYear();
		return formattedTime;
};
let lastDonate = last_donate_date();



const handleUpdateProfile = (req, res, db) => {
	const { id} = req.params;


	console.log(addDaysAns, lastDonate);

	db.from('donors')
		.where({ id: id })
		.increment('donated', 1)
		.update({
			activation_date: addDaysAns,
			last_donate_date: lastDonate,
		})
		.returning('*')
		.then((resp) => {
			if (resp) {
				res.json(resp[0]);
			} else {
				res.status(400).json(resp);
			}
		})
		.catch((err) => {
			res.status(404).json({ message: 'Error Updating Profile' });
		});
};

module.exports = {
	handleUpdateProfile,
};
