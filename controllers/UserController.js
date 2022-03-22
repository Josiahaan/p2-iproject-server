const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { createToken } = require("../helpers/jwt");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ where: { email } });
      if (!user) {
        throw {
          code: 401,
          name: "Unauthorized",
          message: "invalid email/password",
        };
      } else {
        const isValidPass = bcrypt.compareSync(password, user.password);
        if (!isValidPass) {
          res.status(401).json({ message: "Invalid email/password" });
        } else {
          const payload = {
            email: user.email,
            password: user.password,
          };
          const access_token = createToken(payload);
          res.status(200).json({ access_token });
        }
      }
    } catch (err) {
      next(err);
    }
  }
  static async register(req, res, next) {
    try {
      const { fullname, email, password, phoneNumber, address } = req.body;
      const user = await User.create({
        fullname,
        email,
        password,
        phoneNumber,
        address,
      });
      res
        .status(201)
        .json({ message: `user ${user.fullname} has been created` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
