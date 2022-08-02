const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoals,
  deletetGoals,
} = require("../controllers/goalController");

/* CRUD */
router.get("/", getGoals); //router.route('/').get(getGoals).post(setGoals)
router.post("/", setGoals);
router.put("/:id", updateGoals);
router.delete("/:id", deletetGoals);

module.exports = router;
