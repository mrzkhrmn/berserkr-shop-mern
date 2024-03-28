import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) return res.status(400).json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        profilePicture: newUser.profilePicture,
        isAdmin: newUser.isAdmin,
      });
    } else {
      res.status(400).json({ message: "Invalid user data!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in signupUser: " + error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordValid)
      return res.status(400).json({ error: "Invalid credentials!" });

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      profilePicture: user.profilePicture,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in loginUser: " + error.message);
  }
};
