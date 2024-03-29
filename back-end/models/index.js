"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

db.Tables.hasMany(db.Orders, {
    foreignKey: { name: "idTable", allowNull: false },
});

db.Tables.hasMany(db.Reservations, {
    foreignKey: { name: "idTable", allowNull: false },
});

db.Products.belongsToMany(db.Orders, { through: "Bills" });

db.Orders.hasMany(db.Bills);
db.Bills.hasOne(db.Products, { foreignKey: { name: "idProduct" } });

db.Ingredients.belongsToMany(db.Products, { through: "Recipes" });
db.Products.hasMany(db.Recipes);
db.Recipes.hasOne(db.Ingredients, { foreignKey: { name: "idIngredient" } });

db.Layouts.hasMany(db.Tables, {
    foreignKey: { name: "idLayout", allowNull: false },
});

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
