const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { createToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const GOOGLE_CLIENT_ID = process.env.YOUR_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

class UserController {
  static async login(req, res, next) {
    // console.log(req);
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
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            // password: user.password,
          };
          const access_token = createToken(payload);
          res.status(200).json({ access_token, payload});
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
  static async authGoogle(req, res, next) {
    const { idToken } = req.body;
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.YOUR_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userFind = await User.findOne({ where: { email: payload.email } });
      if (!userFind) {
        const newUser = await User.create({
          email: payload.email,
          fullname: payload.name,
          password: "12345678",
          phoneNumber: "12312321321",
          address: "everywhere",
        });
        let newToken = createToken({ id: newUser.id, email: newUser.email });
        // console.log("nembus>>>>>>>>>>>>>>>>");
        res
          .status(200)
          .json({
            newToken,
            id: newUser.id,
            role: newUser.role,
            email: newUser.email,
          });
      }
      let token = createToken({ id: userFind.id, email: userFind.email });
      res
        .status(200)
        .json({
          token,
          id: userFind.id,
          role: userFind.role,
          email: userFind.email,
        });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
