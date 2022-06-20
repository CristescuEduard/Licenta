module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define(
        "Products",
        {
            idProduct: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING,
            },
            subCategory: {
                type: DataTypes.STRING,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            totalQuantity: {
                type: DataTypes.INTEGER,
            },
            productDescription: {
                type: DataTypes.STRING,
            },
        },

        {
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Products;
};
