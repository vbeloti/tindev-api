const axios = require('axios');
const Dev = require('../models/Dev');

class DislikeController {
  async store(req, res) {
    const { devfrom: devFrom } = req.headers;
    const { devTo } = req.params;

    const loggedDev = await Dev.findById(devFrom);
    const targetDev = await Dev.findById(devTo);

    if (!targetDev || !loggedDev) {
      return res.status(400).json({ error: 'Dev not exists' });
    }

    if (loggedDev.dislikes.includes(targetDev._id)) {
      return res.json({ message: 'Only one dislike is allowed'});
    }

    loggedDev.likes = loggedDev.likes.filter((like) => like != devTo);

    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
}

module.exports = DislikeController;
