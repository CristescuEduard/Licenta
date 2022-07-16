module.exports = (sequelize, DataTypes) => {
    const Recipes = sequelize.define(
        "Recipes",
        {
            ingredientQuantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },

        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Recipes;
};
