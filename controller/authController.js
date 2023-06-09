// const authRouter=express.Router();
const userModel=require('../models/userModels');

const jwt=require('jsonwebtoken');
const {jwt_key}=require('../secrets');
const { sendMail } = require('../utility/nodemailer');


module.exports.signup=async function (req, res) {
  try {
    let data = req.body; //nep
      let user = await userModel.create(data);

       //send email to user -> // nodemailer
       await sendMail("signup",user)


    if (user) {
          res.json({
            msg: "user signed up",
            data:user
          });
      }
      else {
          res.json({
            message: "user could not be signed up"
          });
      }
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
}

module.exports.login=async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      //check if password matches
      //bcrypt - compare
      if (password == user.password) {
        let uid = user["_id"];
        var token = jwt.sign({ payload: uid }, jwt_key);
        res.cookie("login", token);
        res.json({
          message: "user logged in",
        });
      } else {
        res.json({
          message: "wrong credentials",
        });
      }
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
}

module.exports.forgetpassword = async function (req, res) {

  try {
    let { email } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      //resetToken
      const resetToken = await user.createResetToken();
      //create link 
      //https://xyz.com/resetPassword/resetToken
      let resetPasswordLink = `${req.protocol}://${req.get('host')}/user/resetpassword/${resetToken}`;
    
       //send email to user -> // nodemailer
       await sendMail("forgetpassword", { email, resetPasswordLink });
      
      res.json({
        message:"email sent successfully"
      })
    }
    else {
      res.json({
        message:'user not found'
      })
    }
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

module.exports.resetpassword = async function (req, res) {
  try {
    const token = req.params.token;
    console.log("0987",token);
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      //resetPasswordHandler will update user in db 
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: "password chnaged succesfully",
      });
    }
    else{
      res.json({
        message: "user not found"
      });
    }
    
  }
  catch (err) {
    res.json({
      message:err.message
    })
  }
}

module.exports.logout = function (req,res) {
  res.cookie('login', ' ', { maxAge: 1 });
  res.json({
    message:'user logged out successfully'
  })
}



