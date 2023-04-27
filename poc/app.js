const express=require('express');
const app=express();

app.listen(3000);

app.get('/',(req,res)=>{
     res.send('hello');
})

app.get('/about',(req,res)=>{
    res.sendFile('./views/about.html',{root:__dirname});
    // res.sendFile('D:/full stack wd/fjp-1/Backend/views/about.html');
    // console.log(__dirname); //D:/full stack wd/fjp-1/Backend
})

// redirects
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
});

//404 page
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root:__dirname});
});


