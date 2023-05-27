let SK = "sk_test_51NBGzmSJyZLYvshzFahfEQLdYiNtb6RKDabK1TXpqtKzbj8zysNdV9xfNrO538UqBBIrPIu9kSAtvniF4sCh2vu900jPIUAwQc";
const stripe = require('stripe')(SK);
const planModel=require("../models/planModels");
const userModel = require("../models/userModels");

module.exports.createSession = async function (req, res) {
    try {
        let userId = req.id;      // bc login honge aur login me -> req.id = user.id;
        let planId = req.params.id;

        const user = await userModel.findById(userId);
        const plan = await planModel.findById(planId);

        const session = await stripe.checkout.sessions.create({
          payment_method_type: ["card"],
          customer_email: user.email,
          client_reference_id: plan.id,
          line_items: [
            {
              
             name: plan.name,
              // name: "HealthyFood101",
              description: plan.description,
              // description: "get yourself in shape",
               price: plan.price * 100,
                // price: "",
              amount:"1234",
              currency: "inr",
              quantity: 1,
            },
          ],

           mode: "payment",
          success_url: `${req.protocol}://${req.get("host")}/profile`,
          cancel_url: `${req.protocol}://${req.get("host")}/profile`,
        });
        res.json({
            msg: "success",
            session
        });
        // res.redirect(303, session.url);
    }
    catch (err) {
        res.json({
            err:err.message
        })
    }
}