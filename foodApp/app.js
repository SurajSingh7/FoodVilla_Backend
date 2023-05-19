//  node methods
// nodemon methods
const express=require('express');
const app=express();
app.listen(3000);

app.use(express.json()); // middleware fucn => post, front->json

const cookieParser=require('cookie-parser');
app.use(cookieParser());

 

const userRouter=require('./Routers/userRouters');
app.use('/user',userRouter);

