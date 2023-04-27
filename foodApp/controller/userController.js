const userModel=require('../models/userModels');


module.exports.getuser=function getuser(req,res){
    res.send("hi");
    // res.sendFile("D:/full stack wd/fjp-1/Backend/public/index.html");
};

module.exports.getUsers=async function getUsers(req,res){

    // read all data from model(in database)
    // let allUsers=await userModel.find(); 
    // read all data on the basis of query from model(in database)
    // let allUsers=await userModel.find({name:'suraj'}); 
    
    // read 1st data from model(in database)
    // let allUsers=await userModel.findOne(); 
    // read 1st data on the basis of query from model(in database)
     let allUsers=await userModel.find(); 
    
     res.json({mess:"yes",data:allUsers});
     console.log(allUsers);
  }

  module.exports.postuser=function postuser (req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        mess:"successfully",
        user:req.body
    })
};

module.exports.pathuser=function pathuser(req,res){
    console.log(req.body);
    // update data in user object hi 
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "data updated succesfully"
    })
};

module.exports.deleteuser=function deleteuser(req,res){
    users={};

    res.json({
      message: "data has been deleted"
  })

};

module.exports.getUserById=function getUserById(req,res){
    console.log(req.params.id);    // 2
    res.json({msg:"user id is ","obj":req.params}); // id:2
};

