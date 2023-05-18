const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const {db_link}=require('../secrets');

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
    }

  });

  
  userSchema.pre('save',function(){
    // console.log('before saving db',this);
    this.confirmPassword=undefined;

  });

  const userModel =mongoose.model("userModel",userSchema);



module.exports=userModel;