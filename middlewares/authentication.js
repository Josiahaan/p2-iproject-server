const { User } = require('../models')
const { readPayload } = require('../helpers/jwt')

const isUser = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if(!access_token) {
      // res.status(401).json({ message: "Invalid token"})
      throw {
        name: "Invalid token"
      }
    }
    const tokenVerify = readPayload(access_token)
    const {id} = tokenVerify
    const user = await User.findOne({where:id});
    if(!user) {
      res.status(404).json({message: "User not found"})
    }

    req.user = {
      id: user.id,
      email: user.email,
    }
    next()
  } catch (err){
    next(err)
  }
}

module.exports = isUser