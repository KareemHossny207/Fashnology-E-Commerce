const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/user');

router.post('/Login', usercontroller.Login);
router.post('/Register', usercontroller.Register);
router.post('/Admin',usercontroller.Admin);

module.exports = router;
