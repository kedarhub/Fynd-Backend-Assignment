const { addExpense } = require("../services/expense.service");

exports.createExpense = async (req, res) => {
  try {
    const expense = await addExpense(req.body);
    res.status(201).json({ success: true, data: expense });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
