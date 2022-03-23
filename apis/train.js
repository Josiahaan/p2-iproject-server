const axios = require("axios");
require("dotenv").config();
const trainApiKey = process.env.trainApiKey;

const train = axios.create({
  baseURL:
    "https://jadwalkeretaapi-indonesian-train-schedule-jadwal-kereta-v1.p.rapidapi.com/api",
  params: {
    apikey: trainApiKey,
    regstasiun: "1",
    tanggal: "20171106",
    dewasa: "1",
    infant: "0",
  },
  headers: {
    "X-RapidAPI-Host":
      "jadwalkeretaapi-indonesian-train-schedule-jadwal-kereta-v1.p.rapidapi.com",
    "X-RapidAPI-Key": "ce12d813c1mshcc757ad2b92e36bp18d74bjsn0f20544dc2e9",
  },
});

module.exports = { train };
