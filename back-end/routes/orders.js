const express = require("express");
const router = express.Router();
const ordersController = require("../controllers").orders;
router.post("/addOrder", ordersController.addOrder);
router.get("/filterOrders/:isPending", ordersController.filterOrders);
router.get(
    "/getOrdersForTableKitchen/:idTable",
    ordersController.getProductsForOrderKitchen
);
router.get("/getOrdersForTable/:idTable", ordersController.getOrdersForTable);
router.get(
    "/getProductsForOrder/:orderId",
    ordersController.getProductsForOrder
);
router.put("/setPrice/:orderId", ordersController.setPrice);
router.put("/setAccepted/:orderId", ordersController.setAccepted);
router.put("/setFinished/:orderId", ordersController.setFinished);
module.exports = router;
