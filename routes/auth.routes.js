const express = require('express');
const router = express.Router();
const passport = require('passport');

const authControllers = require('../controllers/auth.controller');
const { route } = require('./driver.routes');

router.route('/register')
    .get(authControllers.renderRegister)
    .post(authControllers.registerUser)

router.route('/login')
    .get(authControllers.renderLogin)
    .post(authControllers.loginUser)

router.get('/logout',(req,res)=>{
    res.redirect('/');
})



module.exports = router;



