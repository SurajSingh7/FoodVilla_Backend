//   let flag=false; // user logged in or not
function protectRoute(req,res,next){

    if(req.cookies.isLoggedInHai){
       next();
    }else{
         return res.json({mess:"Not allowed"})
    }
}

module.exports=protectRoute;