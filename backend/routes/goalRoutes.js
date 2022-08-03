const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoals,
  deletetGoals,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");
/* CRUD */
router.get("/", protect, getGoals); //router.route('/').get(getGoals).post(setGoals)
router.post("/", protect, setGoals);
router.put("/:id", protect, updateGoals);
router.delete("/:id", protect, deletetGoals);

module.exports = router;
