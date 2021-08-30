const handleProfile = (req, res, db) => {
    const {
        id
    } = req.params;
    
    console.log(req.params);
    
    db.select('*').from('donors').where({
        id
    })
        .then(donor => {
            if (donor.length) {
                res.json(donor[0]);
            } else {
                res.status(400).json('donor not found');
            }
        })
        .catch(err => {
            res.status(404).json('Error getting donor');
        });
};

module.exports = {
    handleProfile
};