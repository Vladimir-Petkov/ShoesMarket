const theatersController = require('../controllers/theatersController');
const userController = require('../controllers/userController');
const auth = require('../utils/auth');
const home = require('../controllers/home');

module.exports = (app) => {
    app.get('/', auth(true), home.startIndex);

    app.get('/register', userController.get.register);
    app.post('/register', userController.post.register);

    app.get('/login', userController.get.login);
    app.post('/login', userController.post.login);

    app.get('/logout', auth(), userController.get.logout);

    app.get('/details/:_id', auth(), theatersController.get.details);

    app.get('/create', auth(), theatersController.get.create);
    app.post('/create', auth(), theatersController.post.create);

    app.get('/edit/:_id', auth(), theatersController.get.edit);
    app.post('/edit/:_id', auth(), theatersController.post.edit);

    app.get('/buyShoe/:_id', auth(), theatersController.post.buyShoe);

    app.get('/delete/:_id', auth(), theatersController.post.delete);

    app.get('/profile/:_id', auth(), userController.get.profile);

    app.get('*', (req, res) => { res.render('404.hbs'); });

};