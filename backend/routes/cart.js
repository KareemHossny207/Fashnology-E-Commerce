const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const cartcontroller = require("../controllers/cart");



router.post("/add", auth, cartcontroller.addToCart);


router.post("/update", auth, cartcontroller.updateCart);

//get the usercart
router.post("/get", auth, cartcontroller.getUserCart);

// remove single product from the cart
router.post("/removefromcart", auth, cartcontroller.removefromcart);

router.post("/removeall", auth, cartcontroller.removeall);

module.exports = router;