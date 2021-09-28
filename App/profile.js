const handleProfile = (req, res, db) => {
    const {
        id
    } = req.params;
    
    db.select('*').from('donors').where({
        id
    })
        .then(donor => {
            if (donor.length) {
                res.json(donor[0]);
            } else {
                res.status(400).json({message:'donor not found'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({message:'Error getting donor'});
        });
};

module.exports = {
    handleProfile
};