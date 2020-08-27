const config = require('../config/config');
const models = require('../models');
const user = require('../models/user');
const { json } = require('body-parser');

module.exports = {
  get: {
    create: (req, res, next) => {
      const hbsObject = {
        pageTitle: 'Create Page',
        isLoggedIn: (req.user.email !== undefined),
        email: req.user.email,
        _id: req.user._id
      };
      return res.render('./shoes/create.hbs', hbsObject);
    },

    edit: (req, res, next) => {
      let id = req.params._id;

      models.Shoes.findById(id).then((shoe) => {

        const hbsObject = {
          pageTitle: 'Details Page',
          isLoggedIn: req.user.email !== undefined,
          email: req.user.email,
          _id: req.user._id,
          shoe
        };

        res.render('./shoes/edit.hbs', hbsObject);
      })
    },

    details: (req, res, next) => {
      let id = req.params._id;
      let isCreator = false;
      let buyer = false;
      let buyersLength = 0;

      models.Shoes.findById(id).then((shoe) => {
        if (shoe.creator == req.user._id) {
          isCreator = true;
        };

        buyersLength = shoe.buyers.length;

        shoe.buyers.forEach((e) => {
          if (JSON.stringify(e) == JSON.stringify(req.user._id)) {
            buyer = true;
            return
          }
        })

        const hbsObject = {
          pageTitle: 'Details Page',
          isLoggedIn: (req.user.email !== undefined),
          email: req.user.email,
          isCreator,
          buyer,
          buyersLength,
          _id: req.user._id,
          shoe
        };
        res.render('./shoes/details.hbs', hbsObject);
      })
    }
  },

  post: {
    create: (req, res, next) => {
      const { name, price, imageUrl, description, brand } = req.body;
      const createdAt = (new Date() + '').slice(0, 24);
      const creator = req.user._id;

      models.Shoes.create({ name, price, imageUrl, description, brand, creator, createdAt }).then((createdPlay) => {
        res.redirect('/');
      });
    },

    edit: (req, res, next) => {
      let id = req.params._id;
      const { name, price, imageUrl, description, brand } = req.body;
      const createdAt = (new Date() + '').slice(0, 24);
      const creator = req.user._id;

      models.Shoes.findByIdAndUpdate(id, { name, price, imageUrl, description, brand, creator, createdAt }).then((updatedPlays) => {
        res.redirect(`/details/${id}`);
      });
    },

    delete: (req, res, next) => {
      const id = req.params._id;

      models.Shoes.findByIdAndRemove(id).then(() => {
        return res.redirect('/');
      })
    },

    buyShoe: (req, res, next) => {
      const shoeId = req.params._id;
      const userId = req.user._id;

      Promise.all([
        models.Shoes.updateOne({ _id: shoeId }, { $push: { buyers: userId } }),
        models.User.updateOne({ _id: userId }, { $push: { OffersBought: shoeId } })
      ]).then(([updatedShoe, updatedUser]) => {
        res.redirect(`/details/${shoeId}`);
      })
    }
  }
};

