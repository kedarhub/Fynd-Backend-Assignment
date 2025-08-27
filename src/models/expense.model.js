const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  splitType: { type: String, enum: ["equal", "exact", "percentage"], required: true },
  splitDetails: { type: Object, required: true } // e.g., {userId: amount/percentage}
});

module.exports = mongoose.model("Expense", expenseSchema);
