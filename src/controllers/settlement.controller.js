const User = require("../models/user.model");

exports.settleDebt = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (amount > user.balance) {
      return res.status(400).json({ message: "Cannot settle more than owed" });
    }

    user.balance -= amount;
    await user.save();

    res.json({ message: "Debt settled", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
