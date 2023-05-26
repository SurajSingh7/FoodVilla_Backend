// "use strict";
const nodemailer = require("nodemailer");
const {mailPass}=require("../secrets");

// async..await is not allowed in global scope, must use a wrapper
// str->'signup'/'forgetpassword'
module.exports.sendMail = async function sendMail(str, data) {
  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "ssgsingh160@gmail.com", // generated ethereal user
      pass: `${mailPass}`
    },
  });


  let eSubj, eHtml;
  if (str == "signup") {
    eSubj = `Thank You for signing ${data.name}`;
    eHtml = `
        <h1>Welcome to foodApp.com</h1>
        Hope you have a great experience 
        Here are your details.
       
        <h3>Name - ${data.name}  </h3>
        <h3> Email - ${data.email} </h3>
        <h5> Thank you for visiting my site. <h5>
        <h5>Suraj singh <h5>
        `;
  } else if (str == "forgetpassword") {
    eSubj = `Reset Password`;
    eHtml = `
        <h1>foodApp.com</h1>
        Here is your link to reset password : ${data.resetPasswordLink}
        `;
  }


  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FoodApp 🥗" <ssgsingh@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: eSubj, // Subject line
    // text: "Hello world?", // plain text body
    html: eHtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
};

// main().catch(console.error);