const { CartItem , User, Product } = require('../models')

class CartItemController {
  static async addToCart(req, res, next) {
    try {
      const {quantity, cart} = req.body
      const { id: UserId } = req.user;
      // console.log(req.body);
      // console.log(UserId, "<<<<<<<<<");
      const response = await CartItem.create({
        quantity: +quantity,
        cart,
        UserId
      })
      // console.log(response, "sadasdasdsad");
      // console.log(created);
      // console.log(bookmark.dataValues);
      res.status(201).json({response});
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
  static async getCart(req, res, next) {
    console.log(req.user, "requser<<<<<<")
    try {
      const { id } = req.user;
      const result = await User.findOne({
          where: {id},
        attributes: {
          exclude: [
            "password",
            "createdAt",
            "updatedAt"
          ]
        },
        include: [
          {
            model: CartItem,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            }
          },
        ],
      });

      res.status(200).json(result);
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
}

module.exports = CartItemController