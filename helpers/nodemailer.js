const nodemailer = require('nodemailer')
require("dotenv").config()
const SERVERID = process.env.SERVERID
const SERVERPASSWORD = process.env.SERVERPASSWORD

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth:{
    user: SERVERID,
    pass: SERVERPASSWORD,
  }
})

const options = {
  from: "indiproject123@outlook.com",
  to: "j.shn50@gmail.com",
  subject: "test individual project",
  text: "HELLO WORLD!!!"
}

transporter.sendMail(options, function(err, info) {
  if(err){
    console.log(err);
    return;
  }
  console.log("sent: "+ info.response);
})