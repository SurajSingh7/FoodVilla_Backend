const userModel=require('../models/userModels');


module.exports.getUser=async function getUser(req,res){

    try {
        let id = req.id;
        let user = await userModel.findById(id);
    
        res.json({ message: "users retrieved", user });
      } catch (err) {
        res.json({
          message: err.message,
        });
      }
};

module.exports.updateUser = async function (req, res) {
    console.log(req.body);
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    // {
    //   name: "Abhi",
    //   email: 'abc@gmail.com'
    // }
    try {
      if (user) {

        for (key in dataToBeUpdated) {
            user[key] = dataToBeUpdated[key];
          }

        console.log("abcd ",user);
  
        const updatedData = await user.save();
        res.json({
          message: "data updated succesfully",
          data:updatedData
        });
      } else {
        res.json({
          message: "user not found",
        });
      }

    }
    catch (err) {
      res.json({
        message: err.message,
      });
    }

  };

module.exports.deleteUser=async function deleteUser(req,res){
    try {
        let id = req.params.id;
        // let doc = await userModel.deleteOne({ email: "abcd@gmail.com" });
        // let doc = await userModel.findOneAndRemove({ email: "abcde@gmail.com" });
        let user = await userModel.findByIdAndDelete(id);
        res.json({
          message: "user has been deleted",
          data:user
        });
      } catch (err) {
        res.json({
          message: err.message
        });
      }

};


module.exports.getAllUser = async function (req, res) {
    try {
      let allUsers = await userModel.find();
      res.json({
        message: "user id is ",
        data:allUsers
      });
    } catch (err) {
      res.json({
        message: err.message
      });
    }
  };

