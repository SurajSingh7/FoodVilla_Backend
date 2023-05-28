const express = require('express');
const { protectRoute, isAuthorised } = require('../helper');
const planRouter = express.Router();
const { getAllPlans, getPlan, createPlan, updatePlan, deletePlan, top3Plans } = require('../controller/planController');

planRouter
    .route('/allPlans')
    .get(getAllPlans);

planRouter
    .route('/top3')
    .get(top3Plans)

planRouter.use(protectRoute) //logged in hai ya nhi 
planRouter
    .route('/plan/:id')
    .get(getPlan)

planRouter.use(isAuthorised(['admin', 'restaurantowner'])) // logged in , lekin role kya hai
planRouter
    .route('/crudPlan')
    .post(createPlan);

planRouter
    .route('/crudPlan/:id')
    .patch(updatePlan)
    .delete(deletePlan)

module.exports = planRouter;