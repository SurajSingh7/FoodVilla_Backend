const express=require('express');
const userRouter=express.Router();
const {protectRoute,isAuthorised}=require('../helper');
const {getUser,updateUser,deleteUser,getAllUser}=require('../controller/userController');
const { signup, login, forgetpassword, resetpassword, logout } = require('../controller/authController');



//user ke options
userRouter
  .route('/:id')
  .patch(updateUser) 
  .delete(deleteUser)

userRouter
  .route("/login")
  .post(login);

userRouter
  .route("/signup")
  .post(signup);

userRouter
  .route("/forgetpassword")
  .post(forgetpassword);

userRouter
  .route("/resetpassword/:token")
  .post(resetpassword);

userRouter
  .route("/logout")
  .get(logout);

//profile page
userRouter.use(protectRoute)
userRouter
  .route('/profilePage')
  .get(getUser)

//admin specific function
userRouter.use(isAuthorised(['admin']));
userRouter.route("/").get(getAllUser);




module.exports=userRouter;
