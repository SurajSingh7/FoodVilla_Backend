const express=require('express');
const userRouter=express.Router();
const {protectRoute}=require('./authHelper');
const {getUser,updateUser,deleteUser,getAllUser}=require('../controller/userController');



















// userRouter
//   .route('/')
//   .get(protectRoute,getUsers)
//   .post(postuser)
//   .patch(pathuser)
//   .delete(deleteuser)

// userRouter
//  .route('/:id')
//  .get(getUserById); 


module.exports=userRouter;
