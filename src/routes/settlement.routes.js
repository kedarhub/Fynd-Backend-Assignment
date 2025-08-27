const express = require("express");
const { settleDebt } = require("../controllers/settlement.controller");
const router = express.Router();

router.post("/", settleDebt);

module.exports = router;
