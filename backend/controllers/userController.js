import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const updateUserProfile = async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res
      .status(403)
      .json({ error: "You are not allowwed to update this user!" });
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return res
        .status(400)
        .json({ error: "username must be between 7 and 20 characters" });
    }

    if (req.body.username.includes(" ")) {
      return res.status(400).json({ error: "Username cannot contains space" });
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return res.status(400).json({ error: "Username must be lower case" });
    }

    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return res
        .status(400)
        .json({ error: "Username can only contains letters and numbers" });
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
          },
        },
        { new: true }
      );

      const { password, ...rest } = updatedUser._doc;

      res.status(200).json(rest);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("Error in updateUserProfile: " + error.message);
    }
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return res
        .status(404)
        .json({ error: "You are not allowed to delete this user" });
    }

    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in deleteUser: " + error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res
      .status(200)
      .json({ users: usersWithoutPassword, lastMonthUsers, totalUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getAllUsers: " + error.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getAllUsers: " + error.message);
  }
};
