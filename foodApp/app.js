//  node methods
// nodemon methods
const express=require('express');
const app=express();
app.listen(3000);

app.use(express.json()); // middleware fucn => post, front->json

const cookieParser=require('cookie-parser');
app.use(cookieParser());


const userRouter=require('./Routers/userRouters');
const planRouter = require('./Routers/planRouters');
const reviewRouter = require('./Routers/reviewRouter');


app.use('/user',userRouter);
app.use('/plan',planRouter);
app.use('/review',reviewRouter);




