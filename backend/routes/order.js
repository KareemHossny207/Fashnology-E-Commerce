const express=require("express")
const router=express.Router()
const adminauth = require('../middleware/adminauth');
const auth = require('../middleware/auth');
const ordercontroller=require("../controllers/order")


// Admin routes
router.get("/all", ordercontroller.allOrders);
router.put("/status", adminauth, ordercontroller.updateStatus); 

// Payment routes
router.post("/place", auth, ordercontroller.placeOrder);
router.post("/stripe", auth, ordercontroller.placeOrderStripe);

// User routes
router.post("/userorders", auth, ordercontroller.userOrders); 
router.post("/verifystripe", auth, ordercontroller.verifyStripe); 

module.exports=router