"use strict";
import nodemailer from "nodemailer";
// async..await is not allowed in global scope, must use a wrapper
async function emailMain(sendToEmail) {
  console.log("sendToEmail--->: ", sendToEmail);
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL, // generated ethereal user
      pass: process.env.USER_PASS, // generated ethereal password
    },
  });

  const options = {
    from: process.env.USER_EMAIL, // sender address
    to: sendToEmail, // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world?",
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log("err--->: ", err);
      return;
    }
    console.log(info.response);
  });
}

emailMain().catch(console.error);
