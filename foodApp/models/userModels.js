const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const {db_link}=require('../secrets');
const { v4: uuidv4 } = require("uuid");

mongoose.connect(db_link)
   .then(function(db){
      console.log("db connected");
   })
   .catch(function(err){
     console.log(err);
   });

  const userSchema=mongoose.Schema({
           
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate : function(){
          return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:7
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:7,
        validate: function(){
          return this.confirmPassword==this.password;
        }
    },

    role: {
      type: String,
      enum: ['admin', 'user', 'restaurantowner', 'deliveryboy'],
      default:'user'
    },
    profileImage: {
      type: String,
      default:'img/users/default.jpg'
    },
    resetToken: { 
      type: String 
    }

  });

  userSchema.pre('save',function(){
    // console.log('before saving db',this);
    this.confirmPassword=undefined;

  });


  userSchema.methods.createResetToken = async function () {
    const resetToken = uuidv4();
    this.resetToken = resetToken;
    // this.confirmPassword = this.password;
    await this.save();
    return resetToken;
  };
  
  userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.resetToken = undefined;
  };




  const userModel =mongoose.model("userModel",userSchema);
module.exports=userModel;