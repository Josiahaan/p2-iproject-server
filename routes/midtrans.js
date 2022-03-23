const midtransClient = require('midtrans-client');
require("dotenv").config()
const express = require("express")
const routerMidtrans = express.Router()
const CLIENT_PAYMENT = process.env.CLIENT_PAYMENT
// Merchant ID	= G936058162
// Client Key	= Mid-client-ysi7qpfG4ePLrADv
// Server Key	= Mid-server-Gktf1Xg7N5eOqRLB97cL0_XX


routerMidtrans.post('/payment', async (req, res) => {
  // console.log(CLIENT_PAYMENT);
  let snap = new midtransClient.Snap({
    isProduction : false,
    serverKey : 'SB-Mid-server-1ma6JiKFEciB7nR0KoP5GMH7',
    clientKey : 'SB-Mid-client-s6SV0WfrkztKRJyG'
  });
  console.log(snap);
  try {
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
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
  }
})

module.exports = routerMidtrans