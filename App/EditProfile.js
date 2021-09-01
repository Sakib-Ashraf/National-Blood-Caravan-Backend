const handleEditProfile = (req, res, db) => {
    const { name, email, mobile, birth_date, area, address } = req.body;
    const { id } = req.params;

    console.log(req.body);

    db.from('login')
        .where({ id: id })
        .update({
            email: email,
            mobile: mobile,
        })
        .returning('mobile')
        .then((loginMobile) => {
            return db('donors')
                .where({ id: id })
                .update({
                    name: name,
                    email: email,
                    mobile: loginMobile[0],
                    birth_date: birth_date,
                    area: area,
                    address: address,
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
                    res.status(404).json({ message: 'Wrong info or already Updated' });
                });
        })
        .catch((err) => {
            res.status(404).json({ message: 'Error Updating Profile' });
        });
};


module.exports = {
	handleEditProfile,
};
