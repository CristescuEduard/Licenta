const express = require("express");
const router = express.Router();
const billsController = require("../controllers").bills;
router.post("/addBill", billsController.addBill);
router.put("/modifyBill", billsController.modifyBill);
module.exports = router;
