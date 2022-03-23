const train = require("../apis/train");
const axios = require('axios')
require("dotenv").config()

class TrainController {
  static async trainSchedules(req, res, next) {
    const trainApiKey = process.env.trainApiKey
    try {
      var options = {
        method: 'GET',
        url: 'https://airport-info.p.rapidapi.com/airport',
        headers: {
          'X-RapidAPI-Host': 'airport-info.p.rapidapi.com',
          'X-RapidAPI-Key': 'ce12d813c1mshcc757ad2b92e36bp18d74bjsn0f20544dc2e9'
        }
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = TrainController;
