const express = require("express");
const router = express.Router();
const users = require("./users");
const products = require("./products");
const orders = require("./orders");
const tables = require("./tables");
const bills = require("./bills");
const layouts = require("./layouts");
const reservations = require("./reservations");
const ingredients = require("./ingredients");
const recipes = require("./recipes");
router.use(
    "/",
    users,
    products,
    orders,
    tables,
    bills,
    layouts,
    reservations,
    ingredients,
    recipes
);
module.exports = router;
