const jwt=require('jsonwebtoken');
const {jwt_key}=require('../secrets');


function protectRoute(req,res,next){

    if(req.cookies.login){
        let verified=jwt.verify(req.cookies.login,jwt_key);
        if(verified){
            next();
        }else{
            return res.json({mess:"Not allowed"});
        }
      
    }else{
         return res.json({mess:"Not allowed"});
    }
}

module.exports={protectRoute};