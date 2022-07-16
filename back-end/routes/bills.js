const express = require("express");
const router = express.Router();
const billsController = require("../controllers").bills;
router.post("/addBill", billsController.addBill);
router.put("/modifyBill", billsController.modifyBill);
router.delete("/deleteBill/:idOrder/:idProduct", billsController.deleteBill);
router.delete("/deleteBills/:idOrder/", billsController.deleteBillsForOrder);
module.exports = router;
