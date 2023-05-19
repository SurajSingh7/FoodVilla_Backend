const jwt=require('jsonwebtoken');
const {jwt_key}=require('./secrets');
const userModel=require('./models/userModels');


//protectRoute
module.exports.protectRoute = async function (req, res, next) {
    let token;
    if (req.cookies.login) {
      token = req.cookies.login;
      let payloadObj = jwt.verify(token, jwt_key); 
      const user = await userModel.findById(payloadObj.payload);
      req.id = user.id;
      req.role = user.role;
      if (payloadObj) next();
      else {
        req.json({
          msg: "user not verified",
        });
      }
    } else {
      return res.json({
        msg: "opertion not allowed",
      });
    }
  };

//isAutorised-? check the user's role
// client will send role key in req obj
module.exports.isAuthorised = function (roles) {
    return function (req, res, next) {
      let role = req.role;
      if (roles.includes(role)==true) {
        next();
      }
      else {
        res.status(401).json({
          msg: "role invalid",
        });
      }
    };
  };
