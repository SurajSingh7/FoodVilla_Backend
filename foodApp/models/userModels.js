
const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');

const db_link='mongodb+srv://220suraj:220surajM@cluster0.cpbzobw.mongodb.net/?retryWrites=true&w=majority';

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
    }

  });

  
  userSchema.pre('save',function(){
    // console.log('before saving db',this);
    this.confirmPassword=undefined;

  });

//   userSchema.pre('save', async function(){
    
//     let salt= await bcrypt.genSalt() //by default bcrypt.genSalt(10);
//     let hashedString= await bcrypt.hash(this.password,salt);
//     // console.log(hashedString," ",salt);
//     //  this.password=hashedString;
    
//     // let passwordMatch=await bcrypt.compare(this.password,hashedString);
//     // console.log(passwordMatch);
     
//   });
 
  // // doc -> jo database me save ho jayega ooo doc milega
  // userSchema.post('save',function(doc){   
  //   console.log('after saving db',doc);
  // });

  //models
  const userModel =mongoose.model("userModel",userSchema);

  // (async function createUser(){
  //   let user={
  //     name:"suraj",
  //     email:"suraj4@gmail.com",
  //     password:"1234567817",
  //     confirmPassword:"1234568817"
  //   }
  //   let data= await userModel.create(user);
  //    console.log(data);
  // })();  

// async function getUsers(req,res){

//   // read all data from model(in database)
//   // let allUsers=await userModel.find(); 
//   // read all data on the basis of query from model(in database)
//   // let allUsers=await userModel.find({name:'suraj'}); 
  
//   // read 1st data from model(in database)
//   // let allUsers=await userModel.findOne(); 
//   // read 1st data on the basis of query from model(in database)
//    let allUsers=await userModel.find({name:'suraj'}); 
  
//    res.json({mess:"yes",data:allUsers});
//    console.log(allUsers);
// }

module.exports=userModel;