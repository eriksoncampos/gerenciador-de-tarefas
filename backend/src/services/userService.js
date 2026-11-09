const User = require("../models/userModel");

class userService {
  async getUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async createUser(data) {
    return await User.create(data);
  }
}

module.exports = new userService();