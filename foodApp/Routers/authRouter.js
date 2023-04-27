const express=require('express');
const authRouter=express.Router();
const userModel=require('../models/userModels');
 

authRouter
    .route('/signup')
    .get(getSignUp)
    .post(postSignUp);

authRouter
    .route('/login')
    .post(loginUser);    


 function getSignUp(req,res){
        res.sendFile("D:/full stack wd/fjp-1/Backend/public/index.html");
     }  
    
//  function postSignUp(req,res){
//         //  res.send("done");
//         let obj=req.body;
//         console.log(obj);
//         res.json({
//             message:"User signed up",
//             data:obj
//         });
//      }   
     

  async function postSignUp(req,res){

        let dataObj=req.body;
        let user=await userModel.create(dataObj);
       
        res.json({mess:"yes  post",data:user});
         console.log(user);
     }


async function loginUser(req,res){
       
   try{ 
  let data=req.body;
  let user= await userModel.findOne({email:data.email});
  console.log(user);
//   res.send(user);
  if(user){
    //bcrypt-> compare use later
    if(user.password==data.password){
        
        let uid=user['_id']; // uid
        let jwttoken=jwt.sign({payload:uid},jwt_key);

        res.cookie('login',jwttoken,{httpOnly:true});


        return res.json({mess:'user has logged in',
                         userDetails:data
    });
    }else{
        return res.json({mess:'wrong credentials'});
    }
    
  }else{
     return res.json({mess:'user not found'});
  }
   }
   catch(err){
   return res.json({mess:"error aa gya"});
   }

}

module.exports=authRouter;






