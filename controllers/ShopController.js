const { Shop } = require("../models");

class ShopController {
  static async addShop(req, res, next) {
    try {
      const { name, imageUrl, address, category } = req.body;

      const newShop = await Shop.create({
        name: name,
        imageUrl: imageUrl,
        address: address,
        category: category,
        UserId: req.user.id,
      });

      res.status(201).json(newShop);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getShopById(req, res, next) {
    try {
      const { userId } = req.params;
      const resp = await Shop.findOne({
        include: ["User"],
        where: {
          userId,
        },
      });

      res.status(200).json(resp);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async updateShop(req, res, next) {
    try {
      const { name, imageUrl, address, category } = req.body;

      await Shop.update(
        {
          name,
          imageUrl,
          address,
          category,
        },
        {
          where: {
            userId: req.user.id,
          },
        }
      );

      res.status(200).json({
        message: `Shop update success`,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = ShopController;
