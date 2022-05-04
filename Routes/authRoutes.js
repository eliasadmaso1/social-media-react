const express = require('express');

const Router = express.Router();

const Controller = require('../Controllers/authController');

Router.post('/register',Controller.register);
Router.post('/login',Controller.login);


module.exports = Router;