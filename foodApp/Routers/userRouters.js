const express=require('express');
const userRouter=express.Router();
const userModel=require('../models/userModels');
const protectRoute=require('./authHelper');

userRouter
  .route('/')
  .get(protectRoute,getUsers)
  .post(postuser)
  .patch(pathuser)
  .delete(deleteuser)


userRouter
  .route('/getcookies')
  .get(getcookies);

userRouter
 .route('/setcookies')
 .get(setcookies);      
 
 
userRouter
 .route('/:id')
 .get(getUserById); 



 
function getuser(req,res){
    res.send("hi");
    // res.sendFile("D:/full stack wd/fjp-1/Backend/public/index.html");
};

async function getUsers(req,res){

    // read all data from model(in database)
    // let allUsers=await userModel.find(); 
    // read all data on the basis of query from model(in database)
    // let allUsers=await userModel.find({name:'suraj'}); 
    
    // read 1st data from model(in database)
    // let allUsers=await userModel.findOne(); 
    // read 1st data on the basis of query from model(in database)
     let allUsers=await userModel.find(); 
    
     res.json({mess:"yes",data:allUsers});
     console.log(allUsers);
  }

function postuser (req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        mess:"successfully",
        user:req.body
    })
};

function pathuser(req,res){
    console.log(req.body);
    // update data in user object hi 
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "data updated succesfully"
    })
};

function deleteuser(req,res){
    users={};

    res.json({
      message: "data has been deleted"
  })

};

function getUserById(req,res){
    console.log(req.params.id);    // 2
    res.json({msg:"user id is ","obj":req.params}); // id:2
};


function setcookies(req, res){
    // res.setHeader('Set-Cookie','isLoginIn=true');
    res.cookie('isLoggvghihbsuraJ',true,{maxAge:1000*60*60*24 ,secure:true , httpOnly:true})
    res.send('cookies has been sendbG');
 }

 function getcookies(req,res){
     let cookies=req.cookies;
     console.log(cookies.isLoggedIn);
     res.send('cokkies received');
 }

// //   let flag=false; // user logged in or not
//  function protectRoute(req,res,next){

//         if(req.cookies.isLoggedInHai){
//            next();
//         }else{
//              return res.json({mess:"Not allowed"})
//         }
//  }
 



module.exports=userRouter;
