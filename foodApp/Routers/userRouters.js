const express=require('express');
const userRouter=express.Router();
const {protectRoute}=require('./authHelper');
const {getuser,getUsers,postuser,pathuser,deleteuser,getUserById}=require('../controller/userController');

userRouter
  .route('/')
  .get(protectRoute,getUsers)
  .post(postuser)
  .patch(pathuser)
  .delete(deleteuser)


// userRouter
//   .route('/getcookies')
//   .get(getcookies);

// userRouter
//  .route('/setcookies')
//  .get(setcookies);      
 
 
userRouter
 .route('/:id')
 .get(getUserById); 


module.exports=userRouter;
