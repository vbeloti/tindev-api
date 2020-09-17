const axios = require('axios');
const Dev = require('../models/Dev');

class LikeController {
  async store(req, res) {
    console.log(req.io, req.connectedUsers);

    const { devfrom: devFrom } = req.headers;
    const { devTo } = req.params;

    const loggedDev = await Dev.findById(devFrom);
    const targetDev = await Dev.findById(devTo);

    if (!targetDev || !loggedDev) {
      return res.status(400).json({ error: 'Dev not exists' });
    }

    if (loggedDev.likes.includes(targetDev._id)) {
      return res.json({ message: 'Only one like is allowed' });
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = req.connectedUsers[devFrom];
      const targetSocket = req.connectedUsers[devTo];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit('match', targetDev);
      }

      if (targetSocket) {
        req.io.to(targetSocket).emit('match', loggedDev);
      }
    }

    loggedDev.dislikes = loggedDev.dislikes.filter(
      (dislike) => dislike != devTo
    );

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
}

module.exports = LikeController;
