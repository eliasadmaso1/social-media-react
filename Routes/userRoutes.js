const express = require('express');

const Router = express.Router();
const Controller = require('../Controllers/userController');

Router.get('/',Controller.getUser);
Router.get('/all',Controller.getUsers);
Router.get('/friends/:userId',Controller.getUserFriends);
Router.put('/follow/:id',Controller.followUser);
Router.put('/unfollow/:id',Controller.unfollowUser);
Router.put('/update',Controller.updateUser);




module.exports = Router;