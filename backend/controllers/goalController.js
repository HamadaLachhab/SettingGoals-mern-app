const asyncHandler = require("express-async-handler"); // that replace try{ }catch
//@desc  Get goals
// @route GET  /api/goals
//@access  Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get goals" });
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
  res.status(200).json({ message: ` body ${req.body.text} ` });
});
//@desc  Update goals
// @route Put  /api/goals/:id
//@access  Private
const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
});
//@desc  delete goals
// @route DELETE  /api/goals/:id
//@access  Private
const deletetGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
});
module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deletetGoals,
};
