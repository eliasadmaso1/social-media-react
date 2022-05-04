const express = require('express');

const Router = express.Router();

const Controller = require('../Controllers/postController');

Router.get('/feed/:userId',Controller.getFeedPosts);
Router.get('/profile/:username',Controller.getUserPosts);
Router.post('/',Controller.addPost);
Router.put('/:id',Controller.updatePost);
Router.put('/like/:id',Controller.updatePostLike);
Router.delete('/:id',Controller.deletePost);

module.exports = Router;