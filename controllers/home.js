const config = require('../config/config');
const models = require('../models');

module.exports = {
    startIndex: function (req, res) {
        const isLoggedIn = (req.user !== undefined);
        let email = null;
        let _id = null;
        const criteria = { buyers: '-1' };

        if (req.user) {
            email = req.user.email;
            _id = req.user._id;
        };

        models.Shoes.find({})
            .sort(criteria)
            .then((shoes) => {
                const hbsObject = {
                    pageTitle: 'Home Page',
                    isLoggedIn,
                    email,
                    _id,
                    shoes
                };

                res.render('./home/home.hbs', hbsObject);
            });
    }
};