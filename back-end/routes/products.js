const express = require("express");
const router = express.Router();
const productsController = require("../controllers").products;
router.post("/addProduct", productsController.addProduct);
router.put("/modifyProduct", productsController.modifyProduct);
router.get("/getProducts", productsController.getProducts);
router.get(
    "/getProductsBySubCategory/:subCategory",
    productsController.getProductsBySubCategory
);
router.get("/getProductsByCategory/", productsController.getProductsByCategory);
router.get(
    "/getIngredientsForProduct/:productId",
    productsController.getIngredientsForProduct
);
router.delete("/deleteProduct/:productId", productsController.delete);
module.exports = router;
