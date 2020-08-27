const models = require('../models');
const jwt = require('../utils/jwt');
const config = require('../config/config');

module.exports = {
    get: {
        login: (req, res, next) => {
            res.render('./users/login.hbs');
        },

        register: (req, res, next) => {
            res.render('./users/register.hbs');
        },

        logout: (req, res, next) => {
            req.user = null;
            res.clearCookie(config.cookie).redirect('/login');
        },

        profile: (req, res, next) => {
            const isLoggedIn = (req.user !== undefined);
            const email = req.user.email || null;
            const id = req.user._id;
            let total = 0;

            models.Shoes.find({ buyers: id })
                .then((shoes) => {
                    shoes.forEach(e => {
                        total += e.price;
                    });
                    let shoesLength = shoes.length;

                    const hbsObject = {
                        pageTitle: 'Home Page',
                        isLoggedIn,
                        email,
                        shoesLength,
                        total,
                        shoes
                    };

                    res.render('./users/profile.hbs', hbsObject);
                });
        }
    },

    post: {
        login: (req, res, next) => {
            const { email, password } = req.body;

            if (email.length > 0 && password.length > 0) {
                models.User.findOne({ email }).then((user) => {
                    Promise.all([user, user.matchPassword(password)])
                        .then(([user, match]) => {
                            if (!match) {
                                console.log('Password is invalid');
                                return
                            }

                            const token = jwt.createToken({ id: user._id });

                            res
                                .cookie(config.cookie, token)
                                .redirect('/');
                        })
                })
            } else {
                res.redirect('/login');
            }
        },

        register: (req, res, next) => {
            const { email, fullname, password, repeatPassword } = req.body;

            if (password === repeatPassword && email.length > 3 && password.length > 3) {
                models.User.create({ email, fullname, password }).then((registeredUser) => {
                    const token = jwt.createToken({ id: registeredUser._id });

                    res
                        .cookie(config.cookie, token)
                        .redirect('/');
                })
            } else {
                res.redirect('/register');
            }
        }
    }
};