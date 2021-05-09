const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const usersController = require('../controllers/users');

router.get('/register', usersController.showRegister);

router.post('/register', catchAsync(usersController.registerUser));

router.get('/login', usersController.showLogin);

router.post('/login', 
passport.authenticate('local', { 
    failureFlash: true, 
    failureRedirect: '/login' }),
    usersController.loginUser);

router.get('/logout', usersController.logoutUser);

module.exports = router;