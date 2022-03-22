const { CartItem , User, Product } = require('../models')

class CartItemController {
  static async addToCart(req, res, next) {
    try {
      const { id: productId } = req.params;
      const { id: userId } = req.user;

      const [cartitem, created] = await CartItem.findOrCreate({
        where: {
          productId,
          userId
        }
      })
      // console.log(created);
      // console.log(bookmark.dataValues);
      if (!created) {
        throw { name: 'AlreadyOnCart' }
      }
      res.status(201).json({
        id: cartitem.dataValues.id,
        productId: cartitem.dataValues.ProductId,
        userId: cartitem.dataValues.UserId,
      });
    } catch (err) {
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
            model: Product,
            through: {
              attributes: []
            },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            exclude: [
              {
                model: CartItem
              },
            ],
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