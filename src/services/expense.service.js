const Expense = require("../models/expense.model");
const User = require("../models/user.model");
const { equalSplit, exactSplit, percentageSplit } = require("../utils/split.helper");

async function addExpense({ group, paidBy, amount, splitType, splitDetails }) {
  let splits;
  if (splitType === "equal") splits = equalSplit(amount, splitDetails.users);
  else if (splitType === "exact") splits = exactSplit(splitDetails);
  else if (splitType === "percentage") splits = percentageSplit(amount, splitDetails);

  const expense = new Expense({ group, paidBy, amount, splitType, splitDetails: splits });
  await expense.save();

  // Update balances
  for (const [userId, share] of Object.entries(splits)) {
    await User.findByIdAndUpdate(userId, { $inc: { balance: share } });
  }

  return expense;
}

module.exports = { addExpense };
