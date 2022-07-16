module.exports = (sequelize, DataTypes) => {
    const Ingredients = sequelize.define(
        "Ingredients",
        {
            idIngredient: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            ingredientName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ingredientPrice: {
                type: DataTypes.STRING,
            },
            ingredientQuantity: {
                type: DataTypes.INTEGER,
            },
        },

        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Ingredients;
};
