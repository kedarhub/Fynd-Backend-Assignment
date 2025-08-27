const express = require("express");
const router = express.Router();
const Group = require("../models/group.model");
const User = require("../models/user.model");
const { getBalances } = require("../controllers/group.controller");

// Create group
router.post("/", async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add user to group
router.post("/:groupId/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    await Group.findByIdAndUpdate(req.params.groupId, { $push: { members: user._id } });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get("/:groupId/balances", getBalances);
router.post("/:groupId/simplify", require("../controllers/group.controller").simplifyDebts);
router.get("/:groupId/history", require("../controllers/group.controller").getHistory);

module.exports = router;
