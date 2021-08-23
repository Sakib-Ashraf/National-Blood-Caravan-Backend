const handleLogIn = (req, res, db, bcrypt) => {
    const { email_or_mobile, password } = req.body;
    console.log(req.body);
    if (!email_or_mobile || !password) {
		return res.status(400).json('incorrect form submission');
	}
    db.select('email', 'hash', 'mobile').from('userslogin')
        .where('email', '=', email_or_mobile || 'mobile', '=', email_or_mobile)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db
					.select('*')
					.from('users')
					.where(
						'email',
						'=',
						email_or_mobile || 'mobile',
						'=',
						email_or_mobile
					)
					.then((user) => {
						res.json(user[0]);
					})
					.catch((err) => res.status(400).json(err, 'User not found'));
            } else {
                res.status(400).json(`Didn't find a match`);
            }
        })
        .catch(err => res.status(400).json(err, 'wrong credentials'));
};
module.exports = {
    handleLogIn
};