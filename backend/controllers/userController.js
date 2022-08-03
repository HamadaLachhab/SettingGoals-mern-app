const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc   Register  new   user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please add all fields");
  }
  //Check if user exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("user already exist");
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Create user
  const user = User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // return a jwt token to client
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc   Authenticate a  user
//@route POST /api/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // compare if the password match the one in server
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid credentials");
  }

  res.json({ message: "Login User" });
});

//@desc   Get    user data  // private route
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({ id: _id, name, email });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" }); // return jwt token (using id encrypted by a jwt_secret)
};

module.exports = {
  registerUser,
  getMe,
  loginUser,
};
