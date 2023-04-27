// node server.js
// creating server with nodejs
// http module


const http=require("http");
const fs=require('fs');
const server=http.createServer((req , res)=>{
    console.log("req from browser to server");
     console.log(req.url);
    res.setHeader('Content-Type','text/html');
    let path='./views';
    switch(req.url){
        case '/':
                path+='/index.html';
                break;
        case '/about':
               path+='/about.html';
               break;
        default :
                path+='/404.html';               
    }
    fs.readFile(path,(err,file)=>{
       if(err){
        console.log(err);
       }else{
        res.write(file);
        res.end();
       }

    })
})

//port no, host name, cb
server.listen(3000,'localhost',()=>{
    console.log("server is listening on port 3000");
})