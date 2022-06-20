const express = require("express");
const router = express.Router();
const layoutsController = require("../controllers").layouts;
router.post("/addLayout", layoutsController.addLayout);
router.get("/getLayouts", layoutsController.getLayouts);
router.get("/getLayout", layoutsController.getLayout);
router.put("/setActive", layoutsController.setActive);
module.exports = router;
