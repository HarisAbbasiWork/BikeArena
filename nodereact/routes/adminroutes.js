var express = require('express');
var router = express.Router();
var admin_controller = require('../controllers/admincontroller');

 
    
router.post('/banuser',admin_controller.banUser)
router.post('/unbanuser',admin_controller.unbanUser)
router.post('/adminsign-in',admin_controller.adminSignin)
        
    module.exports = router;
