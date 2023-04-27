//  node methods
// nodemon methods
const express=require('express');
const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');

const db_link='mongodb+srv://220suraj:220surajM@cluster0.cpbzobw.mongodb.net/?retryWrites=true&w=majority';
const app=express();
app.listen(3000);

app.use(express.json()); // middleware fucn => post, front->json

// const cookieParser=require('cookie-parser');
// app.use(cookieParser());

const authRouter=express.Router();



app.use('/auth',authRouter);
app.use('/user',userRouter);

userRouter
         .route('/getcookies')
         .get(getcookies);

 userRouter
        .route('/setcookies')
        .get(setCookies);         

 function setCookies(req, res){
    // res.setHeader('Set-Cookie','isLoginIn=true');
    res.cookie('isLoggedIn',false,{maxAge:1000*60*60*24 ,secure:true , httpOnly:true})
    res.send('cookies has been send');
 }

 function getcookies(req,res){
     let cookies=req.cookies;
     console.log(cookies.isLoggedIn);
     res.send('cokkies received');
 }
         







   
    
    authRouter
    .route('/signup1')
    .post(postUsers)
    .patch(updateUsers)
    .delete(deleteUsers);










    

// const mongoose=require('mongoose');
// const db_link='';
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

  userSchema.pre('save', async function(){
    
      let salt= await bcrypt.genSalt() //by default bcrypt.genSalt(10);
    let hashedString= await bcrypt.hash(this.password,salt);
    // console.log(hashedString," ",salt);
    //  this.password=hashedString;
    
    // let passwordMatch=await bcrypt.compare(this.password,hashedString);
    // console.log(passwordMatch);
     
  });
 
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

async function getUsers(req,res){

  // read all data from model(in database)
  // let allUsers=await userModel.find(); 
  // read all data on the basis of query from model(in database)
  // let allUsers=await userModel.find({name:'suraj'}); 
  
  // read 1st data from model(in database)
  // let allUsers=await userModel.findOne(); 
  // read 1st data on the basis of query from model(in database)
   let allUsers=await userModel.find({name:'suraj'}); 
  
   res.json({mess:"yes",data:allUsers});
   console.log(allUsers);
}


async function postUsers(req,res){

   let dataObj=req.body;
   let user=await userModel.create(dataObj);
  
   res.json({mess:"yes  post",data:user});
    console.log(user);
}

async function updateUsers(req,res){

  let dataToUpdate=req.body;
  console.log(dataToUpdate);
  let user=await userModel.findOneAndUpdate({email:'suraj3@gmail.com'},dataToUpdate);
 
  res.json({mess:"yes  post",data:user});
  console.log(user);
}
async function deleteUsers(req,res){

  let dataToBeDeleted=req.body;
  let user=await userModel.findOneAndDelete(dataToBeDeleted);
 
  res.json({mess:"yes  post",data:user});
  console.log(user);
}






















// let user = [
//     {
//       id: 1,
//       name: "suraj",
//       age: 22,
//     },
//     {
//       id: 2,
//       name: "chaubey",
//       age: 21,
//     },
//     {
//       id: 3,
//       name: "vivek",
//       age: 19,
//     },
//     {
//         id: 4,
//         name: "suraj",
//         age: 22,
//       }
//   ];

// let users={};
// let userrouter=express.Router();
// app.use('/user',userrouter);

// userrouter
//   .route('/')
//   .get(getuser)
//   .post(postuser)
//   .patch(pathuser)
//   .delete(deleteuser)

// userrouter
//  .route('/:id')
//  .get(getUserById);


// // app.get('/user',getuser);
// // app.post('/user',postuser);
// // app.patch('/user',pathuser);
// // app.delete('/user',deleteuser);
// // app.get('/user/:id',getUserById);

// // query
// app.get('/user',(req,res)=>{
//   console.log(req.query);

//   let { name,age }=req.query;
//   let filterData=user.filter( userobj=>{
//       return (userobj.name==name && userobj.age==age)
//   })
//   console.log(filterData);
//   res.send(filterData);
// });








