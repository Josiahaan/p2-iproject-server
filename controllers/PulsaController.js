const axios = require('axios')
require("dotenv").config()

class PulsaController {
  static async getPulsa(req, res, next) {
  const username = process.env.username
  const sign = process.env.sign
  try {
    const options = {
      method: 'POST',
      url: 'https://prepaid.iak.dev/api/pricelist',
      headers: {'Content-Type': 'application/json'},
      data: {
        username: username,
        sign: sign,
        status: 'all'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      res.status(200).json(response.data)
    }).catch(function (err) {
      console.error(err);
    });
  } catch(err) {
    next(err)
  }
}
}

module.exports = PulsaController