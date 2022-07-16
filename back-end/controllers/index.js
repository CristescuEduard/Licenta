const users = require("./users");
const products = require("./products");
const orders = require("./orders");
const tables = require("./tables");
const bills = require("./bills");
const layouts = require("./layout");
const reserations = require("./reservations");
const ingredients = require("./ingredients");
const recipes = require("./recipes");
const controllers = {
    users,
    products,
    orders,
    tables,
    bills,
    layouts,
    reserations,
    ingredients,
    recipes,
};
module.exports = controllers;
