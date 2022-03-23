const { CartItem , User, Product } = require('../models')
const nodemailer = require('nodemailer')
require("dotenv").config()
const SERVERID = process.env.SERVERID
const SERVERPASSWORD = process.env.SERVERPASSWORD

class CartItemController {
  static async addToCart(req, res, next) {
    try {
      const {quantity, cart} = req.body
      const { id: UserId } = req.user;
      console.log(req.user);
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
    // console.log(req.user, "requser<<<<<<")
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

      res.status(200).json(result.CartItems);
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
  static async deleteCart(req, res, next) {
    const {id} =req.params
    // const {fullname, email} = req.user
    // console.log(req.body);
    const {name, email, price, itemName} = req.body
    try {
     await CartItem.destroy({where:{id}})
      res.status(200).json({message: "success cart deleted"})

      const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth:{
          user: SERVERID,
          pass: SERVERPASSWORD,
        }
      })
      
      const options = {
        from: "indiproject123@outlook.com",
        to: `${email}`,
        subject: `Terima kasih ${name} atas transaksi anda`,
        text: `kamu telah berhasil membeli ${itemName} seharga ${price}. terima kasih untuk pembelian`
      }
      
      transporter.sendMail(options, function(err, info) {
        if(err){
          console.log(err);
          return;
        }
        console.log("sent: "+ info.response);
      })

    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = CartItemController