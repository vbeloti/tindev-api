const axios = require('axios');
const Dev = require('../models/Dev');

class DevController {
  async index(req, res) {
    const { devfrom: devFrom } = req.headers;

    const loggedDev = await Dev.findById(devFrom);

    const devs = await Dev.find({
      $and: [
        { _id: { $ne: devFrom } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } },
      ],
    });

    return res.json(devs);
  }

  async store(req, res) {
    const { username: user } = req.body;

    const userExists = await Dev.findOne({ user });

    if (userExists) {
      return res.json(userExists);
    }

    try {
      const response = await axios.get(`https://api.github.com/users/${user}`);

      let { name, bio, avatar_url: avatar } = response.data;
      !name ? (name = user) : name;

      const dev = await Dev.create({
        name,
        user,
        bio,
        avatar,
      });

      return res.json(dev);
    } catch (error) {
      return res.status(400).json({ error: 'Dev does not exists' });
    }
  }
}

module.exports = DevController;
