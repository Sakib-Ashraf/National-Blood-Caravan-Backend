const handleLogIn = (req, res, db, bcrypt) => {
    const { emailOrMobile, password } = req.body;
    if (!emailOrMobile || !password) {
        return res.status(400).json('incorrect form submission');
    }
    db.select('email', 'hash', 'mobile').from('userslogin')
        .where('email', '=', emailOrMobile || 'mobile', '=', emailOrMobile)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db
					.select('*')
					.from('users')
					.where(
						'email',
						'=',
						emailOrMobile || 'mobile',
						'=',
						emailOrMobile
					)
					.then((user) => {
						res.json(user[0]);
					})
					.catch((err) => res.status(400).json('User not found'));
            } else {
                res.status(400).json(`Didn't find a match`);
            }
        })
        .catch(err => res.status(400).json('wrong credentials'));
};
module.exports = {
    handleLogIn
};