const asyncHandler = require("express-async-handler"); // that replace try{ }catch

const Goal = require("../models/goalModal");
const User = require("../models/userModel");
//@desc  Get goals
// @route GET  /api/goals
//@access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});
//@desc  Set goals
// @route POST  /api/goals
//@access  Private
const setGoals = asyncHandler(async (req, res) => {
  // will not work unless u add the midleware app.use(express.json())  (express.urlenconded({extended: false}))
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({ text: req.body.text, user: req.user.id });
  res.status(200).json(goal);
});
//@desc  Update goals
// @route Put  /api/goals/:id
//@access  Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const user = await user.findById(req.user.id);
  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // new  create if doesn't exist
  res.status(200).json(updatedGoal);

  res.status(200).json({ message: `Update goal ${req.params.id}` });
});
//@desc  delete goals
// @route DELETE  /api/goals/:id
//@access  Private
const deletetGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deletetGoals,
};
