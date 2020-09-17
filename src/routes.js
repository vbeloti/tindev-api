const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router();

require('./config/database');

const devController = new DevController();
const likeController = new LikeController;
const dislikeController = new DislikeController;

routes.get('/devs', devController.index);
routes.post('/devs', devController.store);
routes.post('/devs/:devTo/likes', likeController.store);
routes.post('/devs/:devTo/dislikes', dislikeController.store);

module.exports = routes;
