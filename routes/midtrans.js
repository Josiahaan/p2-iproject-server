const midtransClient = require('midtrans-client');
require("dotenv").config()
const express = require("express");
const { nextTick } = require('@vue/runtime-core');
const routerMidtrans = express.Router()
const server_key = process.env.CLIENT_PAYMENT
const client_key = process.env.CLIENT_KEY

// Client Key	= Mid-client-ysi7qpfG4ePLrADv
// Server Key	= Mid-server-Gktf1Xg7N5eOqRLB97cL0_XX


routerMidtrans.post('/payment', async (req, res, next) => {
  // console.log(CLIENT_PAYMENT);
  let snap = new midtransClient.Snap({
    isProduction : false,
    serverKey : 'SB-Mid-server-1ma6JiKFEciB7nR0KoP5GMH7',
    clientKey : 'SB-Mid-client-s6SV0WfrkztKRJyG'
  });
  // console.log(snap);
  try {
    // console.log("masuk try", req.body);
    const { name, email, price, itemName } = req.body
    // console.log(req.body)
    let parameter = {
      transaction_details: {
          order_id: `${Math.floor(Date.now() / 10)}`,
          gross_amount: price
      },
      credit_card:{
          secure : true
      },
      item_details: {
        name: itemName,
        price: price,
        quantity: 1
      },
      customer_details: {
          name: name,
          email: email,
      }
    };
    const result  = await snap.createTransaction(parameter)
    // console.log(result);
    res.status(200).json(result)
  } catch (err) {
    // console.log("masuk catch");
    console.log(err)
    next(err)
  }
})

module.exports = routerMidtrans