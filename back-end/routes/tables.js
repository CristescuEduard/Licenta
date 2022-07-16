const express = require("express");
const router = express.Router();
const tablesController = require("../controllers").tables;
router.post("/addTable", tablesController.addTable);
router.get("/getTables", tablesController.getTables);
router.put("/updateTableXY", tablesController.updateTableXY);
router.get(
    "/getTablesForLayout/:idLayout",
    tablesController.getTablesForLayout
);
router.put("/updateTable/:idTable", tablesController.updateTable);
router.delete("/deleteTable/:tableId", tablesController.delete);
module.exports = router;
