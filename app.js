//  node methods
// nodemon methods
const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');

var cors=require('cors');
app.use(cors());
app.use(express.static('public/build'));

app.use(express.json()); // middleware fucn => post, front->json
app.use(cookieParser());


const userRouter=require('./Routers/userRouters');
const planRouter = require('./Routers/planRouters');
const reviewRouter = require('./Routers/reviewRouter');
const bookingRouter = require('./Routers/bookingRouter');


app.use('/user',userRouter);
app.use('/plan',planRouter);
app.use('/review',reviewRouter);
app.use('/booking',bookingRouter);

const port=process.env.PORT || 5000;
console.log("hi");
// const port=3000;
app.listen(port);




