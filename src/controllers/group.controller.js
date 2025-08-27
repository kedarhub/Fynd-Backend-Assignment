const Group = require("../models/group.model");
const User = require("../models/user.model");
const Expense = require("../models/expense.model");

exports.getBalances = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate("members");
    if (!group) return res.status(404).json({ message: "Group not found" });

    const balances = {};
    for (let user of group.members) {
      balances[user._id] = {
        name: user.name,
        email: user.email,
        balance: user.balance
      };
    }

    res.json(balances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.simplifyDebts = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate("members");
    if (!group) return res.status(404).json({ message: "Group not found" });

    let balances = group.members.map(u => ({
      id: u._id.toString(),
      name: u.name,
      balance: u.balance
    }));

    let debtors = balances.filter(u => u.balance > 0);
    let creditors = balances.filter(u => u.balance < 0);

    let transactions = [];

    debtors.sort((a, b) => b.balance - a.balance);
    creditors.sort((a, b) => a.balance - b.balance);

    while (debtors.length && creditors.length) {
      let debtor = debtors[0];
      let creditor = creditors[0];

      let settleAmount = Math.min(debtor.balance, -creditor.balance);
      transactions.push({
        from: debtor.name,
        to: creditor.name,
        amount: settleAmount
      });

      debtor.balance -= settleAmount;
      creditor.balance += settleAmount;

      if (debtor.balance === 0) debtors.shift();
      if (creditor.balance === 0) creditors.shift();
    }

    res.json({ simplified: transactions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getHistory = async (req, res) => {
  try {
    const expenses = await require("../models/expense.model").find({ group: req.params.groupId }).populate("paidBy");
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
