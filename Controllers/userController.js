const User = require("../Models/userModel");

async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
  }
}

const getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updateAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (e) {
    res.status(500).json(e);
  }
};




const getUserFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendsList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendsList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendsList);
  } catch (err) {
    res.status(500).json(err);
  }
};

const followUser = async (req, res) => {
  const someUserId = req.params.id;
  const currentUserId = req.body.userId;
  if (currentUserId !== someUserId) {
    try {
      const someUser = await User.findById(someUserId);
      const currentUser = await User.findById(currentUserId);
      if (!someUser.followers.includes(currentUserId)) {
        await someUser.updateOne({ $push: { followers: currentUserId } });
        await currentUser.updateOne({ $push: { followings: someUserId } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

const unfollowUser = async (req, res) => {
  const someUserId = req.params.id;
  const currentUserId = req.body.userId;
  if (currentUserId !== someUserId) {
    try {
      const someUser = await User.findById(someUserId);
      const currentUser = await User.findById(currentUserId);
      if (someUser.followers.includes(currentUserId)) {
        await someUser.updateOne({ $pull: { followers: currentUserId } });
        await currentUser.updateOne({ $pull: { followings: someUserId } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

async function updateUser(req, res) {
  try {
    const userId = req.body.userId;

    const conditions = {
      _id: userId,
    };

    const update = {
      username: req.body.username,
      from: req.body.from,
      city: req.body.city,
      relationship: req.body.relationship,
      profilePicture: req.body.profilePicture,
      coverPicture: req.body.coverPicture,
    };

    let doc = await User.findOneAndUpdate(conditions, update);
    doc = await User.findOne(conditions);

    res.json(doc)
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUser,
  getUserFriends,
  followUser,
  unfollowUser,
  getUsers,
  updateUser,
};
