const express = require("express");
const connectDB = require("./config/db");

const groupRoutes = require("./routes/group.routes");
const expenseRoutes = require("./routes/expense.routes");
const settlementRoutes = require("./routes/settlement.routes");

const app = express();
app.use(express.json());

// DB connection
connectDB();

// Routes
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/settlements", settlementRoutes);


app.get("/", (req, res) => res.send("Expense Split Tracker API Running"));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

module.exports = app; // for testing
